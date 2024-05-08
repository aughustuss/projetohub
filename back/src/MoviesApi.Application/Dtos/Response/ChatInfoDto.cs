namespace MoviesApi.Application.Dtos.Response
{
    public class ChatInfoDto
    {
        public int Id { get; set; }
        public string ChatName { get; set; } = string.Empty;
        public ICollection<UserShortInfoDto> Users { get; set; } = null!;

    }
}
