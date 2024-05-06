using Microsoft.EntityFrameworkCore;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Enums;
using MoviesApi.Domain.Exceptions;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Context;

namespace MoviesApi.Infrastructure.Repositories
{
    public class MovieRepository : IMovieRepository
    {

        private readonly AppDbContext _dbContext;

        public MovieRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CheckIfMovieExistsAsync(string input)
        {
            return await _dbContext.Movies.AnyAsync(m => m.Title == input);
        }

        public async Task<bool> CheckIfMoviesExistsByIdAsync(int input)
        {
            return await _dbContext.Movies.AnyAsync(m => m.Id == input);
        }

        public async Task CreateMovieAsync(Movie input)
        {
            if (await CheckIfMovieExistsAsync(input.Title))
                throw new EntityAlreadyExistsException("Filme com este título já foi adicionado.");

            foreach (var genre in input.Genres)
                if (!GenreHelper.GenreExists(genre.ToString()))
                    throw new EntityNotFoundException($"Categoria {genre} não existe. Crie ela para poder usar.");

            await _dbContext.Movies.AddAsync(input);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Movie input)
        {
            if (!await CheckIfMoviesExistsByIdAsync(input.Id))
                throw new EntityNotFoundException($"Filme com o id {input.Id} não encontrado ou já foi excluído");
            
            _dbContext.Movies.Remove(input);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Movie>> GetAllAsync()
        {
            var movies = await _dbContext.Movies.ToListAsync();

            if (movies.Count == 0)
                throw new EntityNotFoundException("Não há filmes cadastrados");

            return movies;
        }

        public async Task<List<Movie>> GetMoviesByGenreAsync(EGenre genre, int page)
        {
            int offset = (page - 1) * 20;

            var movies = await _dbContext.Movies.Where(m => m.Genres.Contains(genre)).Skip(offset).Take(20).ToListAsync();

            if (movies.Count == 0)
                throw new EntityNotFoundException("Não há filmes cadastrados para esta categoria.");

            return movies;
        }

        public async Task<Movie> GetMovieByIdAsync(int input)
        {
            var movie = await _dbContext.Movies.FirstOrDefaultAsync(m => m.Id == input);
            return movie ?? throw new EntityNotFoundException($"Filme com o id {input} não encontrado.");
        }

        public async Task<List<Movie>> GetMoviesByNameAsync(string input)
        {
            var movies = await _dbContext.Movies.Where(m => m.Title.Contains(input) || m.OriginalTitle.Contains(input)).ToListAsync();

            if (movies.Count == 0)
                throw new EntityNotFoundException("Não há filmes cadastrados.");

            return movies;
        }

        public async Task<List<Movie>> GetMoviesByNameToSearchBoxAsync(string input)
        {
            var movies = await _dbContext.Movies.Where(m => m.Title.Contains(input)).ToListAsync();

            if (movies.Count == 0)
                throw new EntityNotFoundException("Não há filmes cadastrados.");

            return movies;
        }

        public async Task<List<Movie>> GetTrendingMoviesAsync()
        {
            var movies = await _dbContext.Movies.Where(m => m.ReleaseDate >= DateTime.UtcNow.AddDays(-30)).Take(10).ToListAsync();

            if (movies.Count == 0)
                throw new EntityNotFoundException("Não houveram lançamentos esse mês.");

            return movies;

        }

        public async Task<List<Movie>> GetUpcomingMoviesAsync()
        {
            var movies = await _dbContext.Movies.Where(m => m.ReleaseDate >= DateTime.UtcNow.AddDays(15)).Take(10).ToListAsync();

            if (movies.Count == 0)
                throw new EntityNotFoundException("Não há filmes para serem lançados nas próximas semanas.");

            return movies;

        }

        public async Task<List<Movie>> GetPopularMoviesAsync()
        {
            var movies = await _dbContext.Movies.Where(m => m.VoteAverage > 7).ToListAsync();

            if (movies.Count == 0)
                throw new EntityNotFoundException("Não há filmes cujo a aprovação é acima de 70%");

            return movies;

        }

        public async Task UpdateMovieAsync(Movie input)
        {
            _dbContext.Movies.Update(input);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateMovieVotesAsync(Movie input)
        {
            input.VoteCount = await _dbContext.Rates.CountAsync(r => r.MovieId == input.Id);
            input.VoteAverage = (_dbContext.Movies.Include(m => m.Rates).SelectMany(r => r.Rates).Sum(r => r.Vote)) / input.VoteCount;
            _dbContext.Movies.Update(input);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Movie> GetAllMovieInfosByIdAsync(int input)
        {
            var movie = await _dbContext.Movies.Include(m => m.Companies).Include(m => m.Rates).Include(m => m.Comments).ThenInclude(c => c.Author).Where(m => m.Id == input).FirstOrDefaultAsync();
            return movie ?? throw new EntityNotFoundException($"Filme com o id {input} não encontrado.");
        }
    }
}
