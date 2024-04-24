namespace MoviesApi.Application.Dtos.Response
{
    public class CommentInfoDto
    {
        public string Text { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }
        public UserShortInfo? Author { get; set; }
    }
}
