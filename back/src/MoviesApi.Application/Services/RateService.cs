using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Domain.Entities;
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
            rate.Movie = movie;
            rate.Author = await _userRepository.GetUserByIdAsync(input.AuthorId);
            await _rateRepository.CreateRateAsync(rate);
            await _movieRepository.UpdateMovieVotesAsync(movie);
        }
    }
}
