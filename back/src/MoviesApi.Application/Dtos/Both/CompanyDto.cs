namespace MoviesApi.Application.Dtos.Request
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string LogoPath { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string OriginalCountry { get; set; } = string.Empty;
    }
}
