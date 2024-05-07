using Microsoft.AspNetCore.Http;
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

        Task<List<UserShortInfoDto>> GetAllUsersAsync(int input);
        Task<UserInfoDto> GetUserByIdAsync(int input);

        Task<UserInfoDto> GetMyInfosAsync(int input);
        Task<UserInfoDto> GetAllUserInfosByIdAsync(UserIdGetDto input);
        Task<List<UserShortInfoDto>> GetUsersByNameAsync(UserNameGetDto input);


        Task<int> GetUserFavoriteListCountAsync(int input);
        Task<List<int>> GetUserFavoritedListAsync(int input);
        Task<List<int>> GetUserFriendListAsync(int input);

        Task<bool> SendResetPasswordEmailAsync(ForgotPasswordEmailRequest input);

        Task<bool> CheckIfUserWatchedMovieAsync(MovieGetDto input);
        Task<bool> CheckIfUserFavoritedMovieAsync(MovieGetDto input);
        Task<bool> CheckIfUserRatedMovieAsync(MovieGetDto input);
        Task<bool> CheckUserRoleAsync(int input);

        Task AddProfileImageAsync(UserProfileImageCreateDto input);
        Task ConfirmUserAccountAsync(EmailRequest input);
        Task ResetPassword(PasswordResetDto input);
    }
}
