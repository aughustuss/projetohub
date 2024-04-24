using MoviesApi.Domain.Entities;

namespace MoviesApi.Application.Dtos.Request
{
    public class CommentCreateDto
    {
        public string Text { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }
        public int AuthorId { get; set; }
        public int MovieId { get; set; }
    }
}
