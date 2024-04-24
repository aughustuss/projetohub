﻿using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Domain.Entities
{
    public class UserFavoriteMovie
    {
        public DateTime AddedDate { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public User User { get; set; } = null!;
        public Movie Movie { get; set; } = null!;
    }
}
