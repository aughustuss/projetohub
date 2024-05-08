using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Domain.Entities
{
    public class Rate
    {
        [Key]
        public int Id { get; set; }
        public double Vote { get; set; }
        public DateTime CreationDate { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; } = null!;
        public int AuthorId { get; set; }
        public User Author { get; set; } = null!;
    }
}
