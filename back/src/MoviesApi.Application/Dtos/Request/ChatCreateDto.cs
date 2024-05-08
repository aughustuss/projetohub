using MoviesApi.Application.Dtos.Response;

namespace MoviesApi.Application.Dtos.Request
{
    public class ChatCreateDto
    {
        public string ChatName { get; set; } = string.Empty;
        public ICollection<UserIdDto> Users { get; set; } = null!;
    }
}
