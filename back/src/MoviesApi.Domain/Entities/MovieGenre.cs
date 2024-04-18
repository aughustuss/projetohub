using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Domain.Entities
{
    public class MovieGenre
    {
        [Key]
        public int Id { get; set; }
        public int MovieId { get; set; }
        public int GenreId { get; set; }
        public Movie Movie { get; set; } = null!;
        public Genre Genre { get; set; } = null!;
    }
}
