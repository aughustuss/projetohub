using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Enums;

namespace MoviesApi.Application.Dtos.Response
{
    public class MovieInfoDto
    {
        public int Id { get; set; }
        public int Age{ get; set; }
        public List<string> Genres { get; } = [];

        public string BackdropPath { get; set; } = string.Empty;
        public string BackdropSource { get; set; } = string.Empty;
        public string PosterSource {  get; set; } = string.Empty;
        public string PosterPath {  get; set; } = string.Empty;
        
        public string OriginalLanguage { get; set; } = string.Empty;
        public string OriginalTitle {  get; set; } = string.Empty;
        public string Overview {  get; set; } = string.Empty;
        public double Popularity { get; set; }
        public DateTime ReleaseDate {  get; set; }
        public string Title { get; set; } = string.Empty;
        public bool HasVideo { get; set; }
        public double VoteAverage { get; set; }
        public double VoteCount { get; set; }
    }
}
