using MoviesApi.Application.Dtos.Request;

namespace MoviesApi.Application.Interfaces.Services
{
    public interface ICommentService
    {
        Task CreateCommentAsync(CommentCreateDto input);
    }
}
