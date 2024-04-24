using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Domain.Entities
{
    public class Company
    {
        [Key]
        public int Id { get; set; }
        public string LogoPath { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string OriginalCountry {  get; set; } = string.Empty;
        public List<Movie> Movies { get; } = [];
    }
}
