namespace MoviesApi.Application.Dtos.Response
{
    public class MovieInfoToSearchBoxDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Overview {  get; set; } = string.Empty;
    }
}
