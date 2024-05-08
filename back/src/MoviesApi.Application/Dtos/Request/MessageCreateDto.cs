using MoviesApi.Domain.Entities;

namespace MoviesApi.Application.Dtos.Request
{
    public class MessageCreateDto
    {
        public int ChatId { get; set; }

        public int UserId { get; set; }

        public string Content { get; set; } = string.Empty;
    }
}
