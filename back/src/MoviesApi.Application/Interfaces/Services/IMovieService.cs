using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Enums;
namespace MoviesApi.Application.Interfaces.Services
{
    public interface IMovieService
    {
        Task CreateAsync(MovieCreateDto input);
        Task DeleteAsync(int input);

        Task<MovieInfoDto> GetMovieByIdAsync(int input);
        Task<MovieInfoByIdDto?> GetAllMovieInfosByIdAsync(int input);

        Task<List<MovieInfoToSearchBoxDto>> GetMoviesByNameToSearchBoxAsync(string input);
        Task<List<MovieInfoDto>> GetMoviesByNameAsync(string input);
        Task<List<MovieInfoDto>> GetMoviesByGenreAsync(EGenre genre, int page);
        Task<List<MovieInfoDto>> GetAllAsync();
        Task<List<MovieInfoDto>> GetTrendingMoviesAsync();
        Task<List<MovieInfoDto>> GetUpcomingMoviesAsync();
        Task<List<MovieInfoDto>> GetPopularMoviesAsync();
    }
}
