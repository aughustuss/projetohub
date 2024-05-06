
using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Enums;
using MoviesApi.Domain.Interfaces.Repositories;

namespace MoviesApi.Application.Services
{
    public class MovieService : IMovieService
    {

        private readonly IMovieRepository _movieRepository;
        private readonly ICompanyRepository _companyRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IImageUploaderService _imageUploaderService;

        public MovieService(IMovieRepository movieRepository, IMapper mapper, ICompanyRepository companyRepository, IUserRepository userRepository, IImageUploaderService imageUploaderService)
        {
            _movieRepository = movieRepository;
            _mapper = mapper;
            _companyRepository = companyRepository;
            _userRepository = userRepository;
            _imageUploaderService = imageUploaderService;
        }

        public async Task CreateAsync(MovieCreateDto input)
        {
            var movie = _mapper.Map<Movie>(input);

            movie.Companies.Clear();

            foreach (var item in input.Companies)
            {
                var company = await _companyRepository.GetCompanyByIdAsync(item.Id);
                if (company != null)
                    movie.Companies.Add(company);
            }

            if (input.Backdrop != null)
                movie.BackdropPath = await _imageUploaderService.SaveImage(input.Backdrop);

            if(input.Poster != null) 
                movie.PosterPath = await _imageUploaderService.SaveImage(input.Poster);

            movie.Status = movie.ReleaseDate <= DateTime.UtcNow ? EMovieStatus.Released : EMovieStatus.NotReleased;
            movie.CreatorUser = await _userRepository.GetUserByIdAsync(input.CreatorUserId);
            movie.VoteCount = 0;
            movie.VoteAverage = 0;
            await _movieRepository.CreateMovieAsync(movie);
        }

        public async Task DeleteAsync(int input)
        {
            var movie = await _movieRepository.GetMovieByIdAsync(input);

            await _movieRepository.DeleteAsync(movie);
        }

        public async Task<List<MovieInfoDto>> GetAllAsync()
        {
            var movies = await _movieRepository.GetAllAsync();
            return _mapper.Map<List<MovieInfoDto>>(movies);
        }

        public async Task<List<MovieInfoDto>> GetMoviesByGenreAsync(EGenre genre, int page)
        {
            var movies = await _movieRepository.GetMoviesByGenreAsync(genre, page);
            return _mapper.Map<List<MovieInfoDto>>(movies);
        }

        public async Task<MovieInfoDto> GetMovieByIdAsync(int input)
        {
            var movie = await _movieRepository.GetMovieByIdAsync(input);
            return _mapper.Map<MovieInfoDto>(movie);
        }

        public async Task<List<MovieInfoDto>> GetMoviesByNameAsync(string input)
        {
            var movies = await _movieRepository.GetMoviesByNameAsync(input);
            return _mapper.Map<List<MovieInfoDto>>(movies);
        }

        public async Task<List<MovieInfoToSearchBoxDto>> GetMoviesByNameToSearchBoxAsync(string input)
        {
            var movies = await _movieRepository.GetMoviesByNameToSearchBoxAsync(input);
            return _mapper.Map<List<MovieInfoToSearchBoxDto>>(movies);
        }

        public async Task<List<MovieInfoDto>> GetTrendingMoviesAsync()
        {
            var movies = await _movieRepository.GetTrendingMoviesAsync();
            return _mapper.Map<List<MovieInfoDto>>(movies);
        }

        public async Task<List<MovieInfoDto>> GetUpcomingMoviesAsync()
        {
            var movies = await _movieRepository.GetUpcomingMoviesAsync();
            return _mapper.Map<List<MovieInfoDto>>(movies);
        }

        public async Task<List<MovieInfoDto>> GetPopularMoviesAsync()
        {
            var movies = await _movieRepository.GetPopularMoviesAsync();
            return _mapper.Map<List<MovieInfoDto>>(movies);
        }


        public async Task<MovieInfoByIdDto?> GetAllMovieInfosByIdAsync(int input)
        {
            var movie = await _movieRepository.GetAllMovieInfosByIdAsync(input);
            return _mapper.Map<MovieInfoByIdDto>(movie);
        }
    }
}
