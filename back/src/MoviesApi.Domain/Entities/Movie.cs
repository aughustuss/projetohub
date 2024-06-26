﻿using Microsoft.AspNetCore.Http;
using MoviesApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoviesApi.Domain.Entities
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public int Age { get; set; }
        
        public string BackdropPath { get; set; } = string.Empty;
        [NotMapped]
        public IFormFile? Backdrop { get; set; } = null;

        public string PosterPath {  get; set; } = string.Empty;
        [NotMapped]
        public IFormFile? Poster { get; set; } = null;

        public double Budget { get; set; }
        public string? Homepage { get; set; }
        public string? ImdbId { get; set; }
        public string? OriginalLanguage { get; set; }
        public string OriginalTitle { get; set; } = string.Empty;
        public string Overview { get; set; } = string.Empty;
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
