using Microsoft.AspNetCore.Http;

namespace MoviesApi.Application.Interfaces.Services
{
    public interface IImageUploaderService
    {
        Task<string> SaveImage(IFormFile imageFile);
    }
}
