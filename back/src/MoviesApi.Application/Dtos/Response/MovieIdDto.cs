namespace MoviesApi.Application.Dtos.Response
{
    public class MovieIdDto
    {
        public int Id { get; set; }
        public List<string>? Genres { get; set; }
    }
}
