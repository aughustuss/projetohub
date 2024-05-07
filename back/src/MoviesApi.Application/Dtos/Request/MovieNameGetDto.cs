namespace MoviesApi.Application.Dtos.Request
{
    public class MovieNameGetDto
    {
        public string Name { get; set; } = string.Empty;
        public int UserId { get; set; }
    }
}
