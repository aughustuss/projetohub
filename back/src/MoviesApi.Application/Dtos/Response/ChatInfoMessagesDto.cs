namespace MoviesApi.Application.Dtos.Response
{
    public class ChatInfoMessagesDto
    {
        public int Id { get; set; }
        public string ChatName { get; set; } = string.Empty;
        public ICollection<MessageInfoDto> Messages { get; } = new List<MessageInfoDto>();
    }
}
