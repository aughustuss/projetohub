using Microsoft.EntityFrameworkCore;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Exceptions;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Context;

namespace MoviesApi.Infrastructure.Repositories
{
    public class ChatRepository : IChatRepository
    {

        private readonly AppDbContext _dbContext;

        public ChatRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private async Task<bool> CheckIfChatExists(int input)
        {
            return await _dbContext.Chats.AnyAsync(c => c.Id == input);
        }

        public async Task CreateRoomAsync(Chat input)
        {
            await _dbContext.Chats.AddAsync(input);
            await _dbContext.SaveChangesAsync();
        }

        public Task<List<Chat>> GetAllUserChatsAsync(int input)
        {
            throw new NotImplementedException();
        }

        public async Task<Chat> GetChatByIdAsync(int input)
        {
            var chat = await _dbContext.Chats.Include(c => c.Messages).ThenInclude(m => m.User).FirstOrDefaultAsync(u => u.Id == input);
            return chat ?? throw new EntityNotFoundException($"Chat com o id {input} não foi encontrado.");
        }

        public Task SendMessageAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateChatAsync(Chat input)
        {
            throw new NotImplementedException();
        }
    }
}
