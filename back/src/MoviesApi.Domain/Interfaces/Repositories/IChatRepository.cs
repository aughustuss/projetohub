using MoviesApi.Domain.Entities;

namespace MoviesApi.Domain.Interfaces.Repositories
{
    public interface IChatRepository
    {
        Task SendMessageAsync();
        Task<List<Chat>> GetAllUserChatsAsync(int input);
        Task CreateRoomAsync(Chat input);
        Task<Chat> GetChatByIdAsync(int input);
        Task UpdateChatAsync(Chat input);
    }
}
