using Microsoft.AspNetCore.Http;

namespace MoviesApi.Application.Dtos.Request
{
    public class CompanyCreateDto
    {
        public string OriginalCountry { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public IFormFile? Logo { get; set; } = null;
    }
}
