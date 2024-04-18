using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Domain.Entities
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public bool IsAdult { get; set; } = false;
        public DateTime AddedDate { get; set; }
        public string? BackdropPath { get; set; } = null;
        public double Budget { get; set; }
        public string? Homepage { get; set; } = string.Empty;
        public string? ImdbId { get; set; } = string.Empty;
        public string? OriginalLanguage { get; set; } = string.Empty;
        public string OriginalTitle { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
        public double? Popularity { get; set; }
        public string? PosterPath { get; set; } = string.Empty;
        public List<Company>?Companies { get; } = [];
        public List<MovieCompany>? MovieCompanies { get; } = [];
        public List<Country>? Countries { get; } = [];
        public List<MovieCountry>? MovieCountries { get; } = [];
        public List<Genre> Genres { get; } = [];
        public List<MovieGenre> MovieGenres { get; } = [];
        
        public int? UserWithFavoriteListId {  get; set; }
        public User? UserWithFavoriteList {  get; set; }
        public int? UserWithWatchedListId { get; set; }
        public User? UserWithWatchedList { get; set; }
        public int CreatorUserId { get; set; }
        public User CreatorUser { get; set; } = null!;
        public string ReleaseDate { get; set; } = string.Empty;
        public double Revenue { get; set; }
        public double Runtime {  get; set; }
        public string Status { get; set; } = string.Empty;
        public string Tagline { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public bool HasVideo { get; set; } = false;
        public double? VoteAverage { get; set; }
        public int? VoteCount {  get; set; }
        
    }
}
