using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Domain.Entities
{
    public class Chat
    {
        [Key]
        public int Id { get; set; }
        public string ChatName { get; set; } = string.Empty;
        
        public ICollection<Message> Messages { get; set; } = new List<Message>();
        public ICollection<User> Users { get; set; } = new List<User>();
    }
}
