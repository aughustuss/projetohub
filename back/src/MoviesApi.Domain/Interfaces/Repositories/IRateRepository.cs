using MoviesApi.Domain.Entities;

namespace MoviesApi.Domain.Interfaces.Repositories
{
    public interface IRateRepository
    {
        Task CreateRateAsync(Rate input);
    }
}
