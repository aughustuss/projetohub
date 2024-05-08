using MoviesApi.Domain.Entities;

namespace MoviesApi.Domain.Interfaces.Repositories
{
    public interface ICommentRepository
    {
        Task CreateCommentAsync(Comment input);
    }
}
