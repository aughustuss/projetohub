using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Domain.Entities
{
    public class MovieCountry
    {
        [Key]
        public int Id { get; set; }
        public int MovieId {  get; set; }
        public int CountryId { get; set; }
        public Movie Movied { get; set; } = null!;
        public Country Country { get; set; } = null!;
    }
}
