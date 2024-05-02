using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Utils.Models;
using MoviesApi.Domain.Entities;

namespace MoviesApi.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task CreateUserAsync(UserCreateDto input);
        Task<UserTokenDto> AuthenticateUserAsync(UserLoginDto input);
        Task AddMovieToFavoriteListAsync(MovieGetDto input);
        Task AddMovieToWatchedListAsync(MovieGetDto input);
        Task AddUserToFriendListAsync(FriendCreateDto input);
        Task RemoveMovieFromFavoriteListAsync(MovieGetDto input);

        Task<List<UserInfoDto>> GetAllUsersAsync();
        Task<UserInfoDto> GetUserByIdAsync(int input);
        Task<UserInfoDto> GetAllUserInfosByIdAsync(int input);
        Task<List<UserShortInfo>> GetUserByNameAsync(string input);
        Task<int> GetUserFavoriteListCountAsync(int input);

        Task<bool> SendResetPasswordEmailAsync(ForgotPasswordEmailRequest input);

        Task<bool> CheckIfUserRatedMovieAsync(MovieGetDto input);
        Task<bool> CheckUserRoleAsync(int input);

        Task ConfirmUserAccountAsync(EmailRequest input);
        Task ResetPassword(PasswordResetDto input);
    }
}
