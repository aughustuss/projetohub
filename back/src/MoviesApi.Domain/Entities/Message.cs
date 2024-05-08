using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Domain.Entities
{
    public class Message
    {
        [Key]
        public int Id { get; set; }

        public int ChatId { get; set; }
        public Chat Chat { get; set; } = null!;

        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public string Content { get; set; } = string.Empty;
        public DateTime SendDate { get; set; }
    }
}
