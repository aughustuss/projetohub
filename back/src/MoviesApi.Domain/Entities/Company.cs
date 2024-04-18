using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Domain.Entities
{
    public class Company
    {
        [Key]
        public int Id { get; set; }
        public string LogoPath { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string OriginalCountry {  get; set; } = string.Empty;
        public List<Movie>? Movies { get; } = [];
        public List<Company>? MovieCompanies { get; } = [];
    }
}
