using MoviesApi.Domain.Enums;

namespace MoviesApi.Application.Dtos.Request
{
    public class MovieCreateDto
    {  
        public int CreatorUserId { get; set; }
        public bool IsAdult { get; set; } = false;
        public List<EGenre> Genres { get; set; } = null!;
        public List<ELanguage> Languages { get; set; } = null!;
        public List<CompanyGetDto> Companies { get; set; } = null!;
        public DateTime AddedDate { get; set; }
        public double Budget { get; set; }
        public string OriginalTitle { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public DateTime ReleaseDate { get; set; }
        public double Revenue { get; set; }
        public double Runtime { get; set; }
        public EMovieStatus Status { get; set; }
        public string Tagline { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public bool HasVideo { get; set; } = false;
        public string? BackdropPath { get; set; } = null;
        public string? Homepage { get; set; } = string.Empty;
        public string? ImdbId { get; set; } = string.Empty;
        public string? OriginalLanguage { get; set; } = string.Empty;
        public string? PosterPath { get; set; } = string.Empty;
    }
}
