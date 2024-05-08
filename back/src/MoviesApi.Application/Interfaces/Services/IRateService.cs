using MoviesApi.Application.Dtos.Request;

namespace MoviesApi.Application.Interfaces.Services
{
    public interface IRateService
    {
        Task CreateAsync(RateCreateDto input);
    }
}
