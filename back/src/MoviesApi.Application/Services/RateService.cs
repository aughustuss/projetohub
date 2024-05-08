using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Exceptions;
using MoviesApi.Domain.Interfaces.Repositories;

namespace MoviesApi.Application.Services
{
    public class RateService : IRateService
    {

        private readonly IRateRepository _rateRepository;
        private readonly IMovieRepository _movieRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public RateService(IRateRepository rateRepository, IMapper mapper, IUserRepository userRepository, IMovieRepository movieRepository)
        {
            _rateRepository = rateRepository;
            _movieRepository = movieRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task CreateAsync(RateCreateDto input)
        {
            var rate = _mapper.Map<Rate>(input);
            var movie = await _movieRepository.GetMovieByIdAsync(input.MovieId);
            var author = await _userRepository.GetAllUserInfosByIdAsync(input.AuthorId);
            var movieAlreadyRated = author.Rates.Any(r => r.MovieId == input.MovieId);

            if (movieAlreadyRated)
                throw new EntityAlreadyExistsException($"Você já avaliou o filme com id {input.MovieId}."); 

            rate.Author = author;
            rate.Movie = movie;
            await _rateRepository.CreateRateAsync(rate);
            await _movieRepository.UpdateMovieVotesAsync(movie);
        }
    }
}
