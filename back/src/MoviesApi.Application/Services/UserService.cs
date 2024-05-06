using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Domain.Enums;
using Microsoft.AspNetCore.Identity;
using MoviesApi.Domain.Exceptions;
using MoviesApi.Application.Interfaces.Security;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Application.Utils.Models;
using MoviesApi.Application.Utils.EmailBodies;
using MoviesApi.Utils.EmailBodies;

namespace MoviesApi.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMovieRepository _movieRepository;
        private readonly IRateRepository _rateRepository;
        private readonly IUserFavoriteMovieRepository _userFavoriteMovieRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IPasswordHandler<User> _hasher;
        private readonly IJwtHandler _tokenHandler;

        public UserService(
            IUserRepository userRepository,
            IMovieRepository movieRepository,
            IRateRepository rateRepository,
            IMapper mapper,
            IPasswordHandler<User> hasher,
            IJwtHandler tokenHandler,
            IUserFavoriteMovieRepository userFavoriteMovieRepository,
            IEmailService emailService
            )
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _hasher = hasher;
            _tokenHandler = tokenHandler;
            _movieRepository = movieRepository;
            _rateRepository = rateRepository;
            _userFavoriteMovieRepository = userFavoriteMovieRepository;
            _emailService = emailService;
        }

        public async Task CreateUserAsync(UserCreateDto input)
        {
            var user = _mapper.Map<User>(input);

            user.CreationDate = DateTime.UtcNow;

            user.Password = _hasher.HashPassword(user, user.Password);

            user.ProfileTitle = "Um novato no mundo dos filmes...";

            user.EmailConfirmToken = user.GenerateToken();

            user.EmailConfirmTokenLifetime = DateTime.UtcNow.AddMinutes(30);

            user.Role = EUser.User;

            var email = new Email
            {
                To = user.Email,
                Subject = "Confirmação de Email",
                Body = ConfirmAccountEmailBody.ConfirmAccountEmail(user.Email, user.EmailConfirmToken)
            };

            await _userRepository.CreateUserAsync(user);
            await _emailService.SendEmailAsync(email);
        }

        public async Task<UserInfoDto> GetUserByIdAsync(int input)
        {
            var user = await _userRepository.GetUserByIdAsync(input);
            return _mapper.Map<UserInfoDto>(user);
        }

        public async Task<List<UserShortInfoDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return _mapper.Map<List<UserShortInfoDto>>(users);
        }

        public async Task<UserTokenDto> AuthenticateUserAsync(UserLoginDto input)
        {
            var user = await _userRepository.GetUserByEmailAsync(input.Email);

            if (user.Active == false)
                throw new NotConfirmedAccountException("Usuário não possui a conta confirmada. Verifique a caixa de email.");

            var passwordMatches = _hasher.VerifyHashedPassword(user, user.Password, input.Password) == PasswordVerificationResult.Success;

            if (!passwordMatches)
                throw new WrongEntryException("Senha inválida.");

            user.Token = _tokenHandler.CreateToken(user);
            user.TokenLifetime = DateTime.UtcNow.AddDays(2);
            await _userRepository.AuthenticateUserAsync(user);

            return _mapper.Map<UserTokenDto>(user);
        }

        public async Task<List<UserShortInfoDto>> GetUserByNameAsync(string input)
        {
            var user = await _userRepository.GetUsersByNameAsync(input);
            return _mapper.Map<List<UserShortInfoDto>>(user);
        }

        public async Task AddMovieToFavoriteListAsync(MovieGetDto input)
        {
            var movie = await _movieRepository.GetMovieByIdAsync(input.MovieId);
            var user = await _userRepository.GetUserByIdAsync(input.UserId);

            var userFavoriteMovie = new UserFavoriteMovie
            {
                User = user,
                Movie = movie,
                AddedDate = DateTime.UtcNow,
            };

            user.FavoriteMovies.Add(movie);
            await _userFavoriteMovieRepository.CreateUserFavoriteMovieAsync(userFavoriteMovie);
            await _userRepository.UpdateUserAsync(user);
        }

        public async Task AddMovieToWatchedListAsync(MovieGetDto input)
        {
            var movie = await _movieRepository.GetMovieByIdAsync(input.MovieId);
            var user = await _userRepository.GetAllUserInfosByIdAsync(input.UserId);
            var movieAlreadyAdded = user.WatchedMovies.Any(m => m.Id == input.MovieId);

            if (movieAlreadyAdded)
                throw new EntityAlreadyExistsException($"Filme com o id {input.MovieId} já está adicionado na sua lista.");

            user.WatchedMovies.Add(movie);
            user.ProfileTitle = user.BuildProfileTitle();
            await _userRepository.UpdateUserAsync(user);
        }

        public async Task AddUserToFriendListAsync(FriendCreateDto input)
        {

            if (input.UserId == input.FriendId)
                throw new SameEntityException("Você não pode se adicionar como amigo.");

            var user = await _userRepository.GetAllUserInfosByIdAsync(input.UserId);

            var userIsAlreadyFriend = user.Friends.Any(f => f.Id == input.FriendId);

            if (userIsAlreadyFriend) 
                throw new EntityAlreadyExistsException($"Usuário com o id {input.FriendId} já é um amigo.");

            var friend = await _userRepository.GetUserByIdAsync(input.FriendId);

            user.Friends.Add(friend);

            await _userRepository.UpdateUserAsync(user);
        }

        public async Task<UserInfoDto> GetAllUserInfosByIdAsync(int input)
        {
            var user = await _userRepository.GetAllUserInfosByIdAsync(input);

            var mappedUser = _mapper.Map<UserInfoDto>(user);

            return mappedUser;
        }

        public async Task ResetPassword(PasswordResetDto input)
        {
            var user = await _userRepository.GetUserByEmailAsync(input.Email);

            var token = user.ResetPasswordToken;

            var tokenLifetime = user.ResetPasswordTokenLifetime;

            if (tokenLifetime < DateTime.UtcNow)
                throw new ExpiredTokenException("Token de redefinição de senha expirado. Reenvie o email de redefinição.");

            if (token != input.ResetPasswordToken)
                throw new WrongEntryException("Token inválido");

            var passwordMatches = _hasher.VerifyHashedPassword(user, user.Password, input.NewPassword) == PasswordVerificationResult.Success;

            if (passwordMatches)
                throw new SameEntityException("Sua senha nova não pode ser igual à senha antiga");

            user.Token = null;
            user.TokenLifetime = null;

            user.Password = _hasher.HashPassword(user, input.NewPassword);

            await _userRepository.UpdateUserAsync(user);
        }

        public async Task<bool> SendResetPasswordEmailAsync(ForgotPasswordEmailRequest input)
        {
            var user = await _userRepository.GetUserByEmailAsync(input.Email);

            user.ResetPasswordToken = user.GenerateToken();

            user.ResetPasswordTokenLifetime = DateTime.UtcNow.AddMinutes(30);

            var email = new Email
            {
                To = user.Email,
                Subject = "Pedido de redefinição de senha",
                Body = ResetPasswordEmailBody.ResetPasswordEmail(user.Email, user.ResetPasswordToken),
            };

            await _userRepository.UpdateUserAsync(user);

            return await _emailService.SendEmailAsync(email);
        }

        public async Task ConfirmUserAccountAsync(EmailRequest input)
        {
            var user = await _userRepository.GetUserByEmailAsync(input.Email);

            if (user.Active == true)
                throw new WrongEntryException("Usuário já possui a conta confirmada.");

            if (user.EmailConfirmTokenLifetime < DateTime.UtcNow)
                throw new ExpiredTokenException("Token de confirmação expirado. Reenvie o email.");

            if (user.EmailConfirmToken != input.EmailToken)
                throw new WrongEntryException("Token inválido.");

            user.Active = true;

            await _userRepository.UpdateUserAsync(user);
        }

        public async Task RemoveMovieFromFavoriteListAsync(MovieGetDto input)
        {
            var user = await _userRepository.GetAllUserInfosByIdAsync(input.UserId);

            var movie = await _movieRepository.GetMovieByIdAsync(input.MovieId);

            user.FavoriteMovies.Remove(movie);

            await _userRepository.UpdateUserAsync(user);
        }

        public async Task<bool> CheckIfUserRatedMovieAsync(MovieGetDto input)
        {
            var user = await _userRepository.GetAllUserInfosByIdAsync(input.UserId);

            var movie = await _movieRepository.GetMovieByIdAsync(input.MovieId);

            var exists = user.FavoriteMovies.Any(m => m.Id == input.MovieId);

            return exists;
        }

        public async Task<bool> CheckUserRoleAsync(int input)
        {
            var user = await _userRepository.GetUserByIdAsync(input);

            return user.Role == EUser.Admin;
        }

        public async Task<int> GetUserFavoriteListCountAsync(int input)
        {
            var user = await _userRepository.GetAllUserInfosByIdAsync(input);

            return user.FavoriteMovies.Count;
        }
    }
}
