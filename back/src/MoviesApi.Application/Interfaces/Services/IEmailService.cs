using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Utils;
using MoviesApi.Application.Utils.Models;

namespace MoviesApi.Application.Interfaces.Services
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(Email input);
    }
}
