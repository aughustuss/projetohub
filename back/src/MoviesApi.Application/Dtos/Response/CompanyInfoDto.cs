using Microsoft.AspNetCore.Http;

namespace MoviesApi.Application.Dtos.Response
{
    public class CompanyInfoDto
    {
        public int Id { get; set; }
        public string LogoPath { get; set; } = string.Empty;
        public string ImageSource { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string OriginalCountry { get; set; } = string.Empty;
    }
}
