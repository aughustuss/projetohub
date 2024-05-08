using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Context;

namespace MoviesApi.Infrastructure.Repositories
{
    public class CommentRepository : ICommentRepository
    {

        private readonly AppDbContext _dbContext;

        public CommentRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateCommentAsync(Comment input)
        {
            _dbContext.Comments.Add(input);
            await _dbContext.SaveChangesAsync();
        }
    }
}
