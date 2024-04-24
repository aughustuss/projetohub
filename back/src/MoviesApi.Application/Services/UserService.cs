using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Identity;
using MoviesApi.Domain.Exceptions;
using MoviesApi.Application.Interfaces.Security;
using MoviesApi.Application.Interfaces.Services;

namespace MoviesApi.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMovieRepository _movieRepository;
        private readonly IRateRepository _rateRepository;
        private readonly IUserFavoriteMovieRepository _userFavoriteMovieRepository;
        private readonly IMapper _mapper;
        private readonly IPasswordHandler<User> _hasher;
        private readonly IJwtHandler _tokenHandler;

        public UserService(
            IUserRepository userRepository, 
            IMovieRepository movieRepository, 
            IRateRepository rateRepository,
            IMapper mapper, 
            IPasswordHandler<User> hasher, 
            IJwtHandler tokenHandler,
            IUserFavoriteMovieRepository userFavoriteMovieRepository
            )
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _hasher = hasher;
            _tokenHandler = tokenHandler;
            _movieRepository = movieRepository;
            _rateRepository = rateRepository;
            _userFavoriteMovieRepository = userFavoriteMovieRepository;
        }

        public async Task CreateUserAsync(UserCreateDto input)
        {
            var user = _mapper.Map<User>(input);
            user.CreationDate = DateTime.UtcNow;
            user.Password = _hasher.HashPassword(user, user.Password);
            user.ProfileTitle = "Um novato no mundo dos filmes...";
            await _userRepository.CreateUserAsync(user);
        }

        public async Task<UserInfoDto> GetUserByIdAsync(int input)
        {
            var user = await _userRepository.GetUserByIdAsync(input);
            return _mapper.Map<UserInfoDto>(user);
        }

        public async Task<List<UserInfoDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllUsersAsync();
            return _mapper.Map<List<UserInfoDto>>(users);
        }

        public async Task<UserTokenDto> AuthenticateUserAsync(UserLoginDto input)
        {
            var user = await _userRepository.GetUserByEmailAsync(input.Email);

            var passwordMatches = _hasher.VerifyHashedPassword(user, user.Password, input.Password) == PasswordVerificationResult.Success;

            if (!passwordMatches)
                throw new WrongPasswordException("Senha inválida.");

            user.Token = _tokenHandler.CreateToken(user);
            user.TokenLifetime = DateTime.UtcNow.AddDays(2);
            await _userRepository.AuthenticateUserAsync(user);

            return _mapper.Map<UserTokenDto>(user);
        }

        public async Task<List<UserShortInfo>> GetUserByNameAsync(string input)
        {
            var user = await _userRepository.GetUsersByNameAsync(input);
            return _mapper.Map<List<UserShortInfo>>(user);
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
            var user = await _userRepository.GetUserByIdAsync(input.UserId);
            user.WatchedMovies.Add(movie);
            await _userRepository.UpdateUserAsync(user);
        }

        public async Task<UserInfoDto> GetAllUserInfosByIdAsync(int input)
        {
            var user = await _userRepository.GetAllUserInfosByIdAsync(input);
            return _mapper.Map<UserInfoDto>(user);
        }
    }
}
