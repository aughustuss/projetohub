using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;

namespace MoviesApi.Application.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IMovieRepository _movieRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public CommentService(ICommentRepository commentRepository, IMapper mapper, IMovieRepository movieRepository, IUserRepository userRepository)
        {
            _commentRepository = commentRepository;
            _mapper = mapper;
            _movieRepository = movieRepository;
            _userRepository = userRepository;
        }

        public async Task CreateCommentAsync(CommentCreateDto input)
        {
            var comment = _mapper.Map<Comment>(input);
            comment.Author = await _userRepository.GetUserByIdAsync(input.AuthorId);
            comment.Movie = await _movieRepository.GetMovieByIdAsync(input.MovieId);
            await _commentRepository.CreateCommentAsync(comment);
        }
    }
}
