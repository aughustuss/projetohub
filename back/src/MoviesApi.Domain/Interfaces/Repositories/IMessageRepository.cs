using MoviesApi.Domain.Entities;

namespace MoviesApi.Domain.Interfaces.Repositories
{
    public interface IMessageRepository
    {
        Task AddMessageAsync(Message input);
    }
}
