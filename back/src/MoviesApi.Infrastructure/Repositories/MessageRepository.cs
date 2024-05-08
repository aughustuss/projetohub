using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Context;

namespace MoviesApi.Infrastructure.Repositories
{
    public class MessageRepository : IMessageRepository
    {

        private readonly AppDbContext _dbContext;

        public MessageRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddMessageAsync(Message input)
        {
            await _dbContext.Messages.AddAsync(input);
            await _dbContext.SaveChangesAsync();
        }
    }
}
