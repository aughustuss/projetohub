namespace MoviesApi.Domain.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Text {  get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }
        public int AuthorId { get; set; }
        public User Author { get; set; } = null!;
        public int MovieId { get; set; }
        public Movie Movie { get; set; } = null!;
    }
}
