using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoviesApi.Domain.Entities
{
    public class Company
    {
        [Key]
        public int Id { get; set; }
        public string LogoPath { get; set; } = string.Empty;

        [NotMapped]
        public IFormFile? Logo { get; set; } = null;

        [NotMapped]
        public string ImageSource {  get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
        public string OriginalCountry {  get; set; } = string.Empty;
        public List<Movie> Movies { get; } = [];
    }
}
