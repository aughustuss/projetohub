using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Domain.Entities;

namespace MoviesApi.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task CreateUserAsync(UserCreateDto input);
        Task<UserTokenDto> AuthenticateUserAsync(UserLoginDto input);
        Task AddMovieToFavoriteListAsync(MovieGetDto input);
        Task AddMovieToWatchedListAsync(MovieGetDto input);

        Task<UserInfoDto> GetUserByIdAsync(int input);
        Task<UserInfoDto> GetAllUserInfosByIdAsync(int input);
        Task<List<UserShortInfo>> GetUserByNameAsync(string input);
        Task<List<UserInfoDto>> GetAllUsersAsync();
    }
}
