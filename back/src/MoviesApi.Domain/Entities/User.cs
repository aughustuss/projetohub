using MoviesApi.Domain.Enums;
using MoviesApi.Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Domain.Entities
{
    public  class User : IUser
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string SurName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public EUser UserType { get; set; } = EUser.User;
        public string? Token { get; set; } = string.Empty;
        public string? EmailConfirmToken { get; set; } = string.Empty;
        public DateTime? TokenLifetime { get; set; }
        public DateTime? EmailConfirmTokenLifetime { get; set; }
        public bool? Active { get; set; } = false;
        public DateTime? CreationDate { get; set; }
        public DateTime? DeleteDate { get; set; }
        public ICollection<Movie>? AddedMovies { get; } = [];
        public ICollection<Movie>? FavoriteMovies { get; } = [];
        public ICollection<Movie>? WatchedMovies { get; } = [];
        public string HashPassword(string password)
        {
            throw new NotImplementedException();
        }

        public string UnhashPassword(string password)
        {
            throw new NotImplementedException();
        }
    }
}
