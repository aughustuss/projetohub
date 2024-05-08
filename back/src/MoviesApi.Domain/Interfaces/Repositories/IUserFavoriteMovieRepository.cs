using MoviesApi.Domain.Entities;

namespace MoviesApi.Domain.Interfaces.Repositories
{
    public interface IUserFavoriteMovieRepository
    {
        Task CreateUserFavoriteMovieAsync(UserFavoriteMovie input);
    }
}
