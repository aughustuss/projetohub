using MoviesApi.Domain.Entities;

namespace MoviesApi.Domain.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task CreateUserAsync(User input);
        Task AuthenticateUserAsync(User input);
        Task AddMovieToUserListAsync(User input);

        Task<User> GetUserByEmailAsync(string input);
        Task<User> GetUserByIdAsync(int input);
        Task<User> GetAllUserInfosByIdAsync(int input);

        Task<List<User>> GetUsersByNameAsync(string name, int userId);
        Task<List<User>> GetAllUsersAsync(int input);
        Task UpdateUserAsync(User input);

    }
}
