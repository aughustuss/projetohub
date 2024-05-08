using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Enums;

namespace MoviesApi.Domain.Interfaces.Repositories
{
    public interface IMovieRepository
    {
        Task CreateMovieAsync(Movie input);

        Task UpdateMovieAsync(Movie input);
        Task DeleteAsync(Movie input);

        Task<Movie> GetMovieByIdAsync(int input);
        Task<Movie> GetAllMovieInfosByIdAsync(int input);

        Task<List<Movie>> GetMoviesByNameAsync(string input);
        Task<List<Movie>> GetMoviesByNameToSearchBoxAsync(string input);
        Task<List<Movie>> GetMoviesByGenreAsync(EGenre genre, int page);
        Task<List<Movie>> GetTrendingMoviesAsync();
        Task<List<Movie>> GetUpcomingMoviesAsync();
        Task<List<Movie>> GetPopularMoviesAsync();
        Task<List<Movie>> GetAllAsync();

        Task<bool> CheckIfMovieExistsAsync(string input);
        Task<bool> CheckIfMoviesExistsByIdAsync(int input);
        
        Task UpdateMovieVotesAsync(Movie input);
    }
}
