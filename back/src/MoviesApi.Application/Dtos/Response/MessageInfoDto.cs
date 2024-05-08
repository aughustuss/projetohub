namespace MoviesApi.Application.Dtos.Response
{
    public class MessageInfoDto
    {
        public UserShortInfoDto User { get; set; } = null!;
        public string Content { get; set; } = string.Empty;
        public DateTime SendDate { get; set; }
    }
}
