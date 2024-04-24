using MoviesApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Domain.Entities
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public bool IsAdult { get; set; } = false;
        public string? BackdropPath { get; set; } = null;
        public double Budget { get; set; }
        public string? Homepage { get; set; }
        public string? ImdbId { get; set; }
        public string? OriginalLanguage { get; set; }
        public string OriginalTitle { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public string? PosterPath { get; set; }
        public DateTime ReleaseDate { get; set; }
        public double Revenue { get; set; }
        public double Runtime {  get; set; }
        public EMovieStatus Status { get; set; }
        public string Tagline { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public bool HasVideo { get; set; } = false;
        public double? Popularity { get; set; }
        public double? VoteAverage { get; set; }
        public int? VoteCount {  get; set; }

        public int CreatorUserId { get; set; }
        public User CreatorUser { get; set; } = null!;

        public ICollection<Comment> Comments { get; } = new List<Comment>();
        public ICollection<Rate> Rates { get; } = new List<Rate>();

        public List<EGenre> Genres { get; set; } = [];
        public List<ELanguage> Languages { get; set; } = [];
        public List<Company> Companies { get; } = [];
        public List<User> InUsersFavoriteList { get; } = [];
        public List<User> InUsersWatchedList { get; } = [];
    }
}
