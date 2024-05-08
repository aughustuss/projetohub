using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Utils.Models;

namespace MoviesApi.Application.Interfaces.Services
{
    public interface IChatService
    {
        Task JoinChatAsync(UserConnection connection);
        Task SendMessageAsync(MessageCreateDto input);
        Task CreateRoomAsync(ChatCreateDto input);
        Task<ChatInfoDto> GetChatByIdAsync(int input);
        Task<ChatInfoMessagesDto> GetChatMessagesById(int input);
    }
}
