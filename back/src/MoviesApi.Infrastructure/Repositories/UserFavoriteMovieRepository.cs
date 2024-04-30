using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Context;

namespace MoviesApi.Infrastructure.Repositories
{
    public class UserFavoriteMovieRepository : IUserFavoriteMovieRepository
    {
        private readonly AppDbContext _dbContext;

        public UserFavoriteMovieRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateUserFavoriteMovieAsync(UserFavoriteMovie input)
        {
            _dbContext.UsersFavoriteMovies.Add(input);
            await _dbContext.SaveChangesAsync();
        }

    }
}
