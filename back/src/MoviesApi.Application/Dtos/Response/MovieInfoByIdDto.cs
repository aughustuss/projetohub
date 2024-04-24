using MoviesApi.Application.Dtos.Request;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Enums;

namespace MoviesApi.Application.Dtos.Response
{
    public class MovieInfoByIdDto : MovieInfoDto
    {
        public List<CompanyDto>? Companies { get; } = [];
        public List<ELanguage>? Countries { get; } = [];
        public List<CommentInfoDto>? Comments { get; } = [];
        public double Budget { get; set; }
        public string? Homepage { get; set; } = string.Empty;
        public string? ImdbId { get; set; } = string.Empty;
        public double Revenue { get; set; }
        public double Runtime { get; set; }
        public EMovieStatus Status { get; set; }
        public string Tagline { get; set; } = string.Empty;
    }
}
