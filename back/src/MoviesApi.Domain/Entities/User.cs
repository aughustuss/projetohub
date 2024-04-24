using MoviesApi.Domain.Enums;
using MoviesApi.Domain.Interfaces.Entities;
using System.ComponentModel.DataAnnotations;

namespace MoviesApi.Domain.Entities
{
    public class User : IUser
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string SurName { get; set; } = string.Empty;
        public string? ProfileTitle { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public EUser Role { get; set; }
        public string? Token { get; set; }
        public string? EmailConfirmToken { get; set; }
        public DateTime? TokenLifetime { get; set; }
        public DateTime? EmailConfirmTokenLifetime { get; set; }
        public bool? Active { get; set; } = false;
        public DateTime? CreationDate { get; set; }
        public DateTime? DeleteDate { get; set; }

        public ICollection<Movie> AddedMovies { get; } = new List<Movie>(); 
        public ICollection<Comment> Comments { get; } = new List<Comment>();
        public ICollection<Rate> Rates { get; } = new List<Rate>();

        public List<User> Friends { get; } = [];
        public List<Movie> FavoriteMovies { get; } = [];
        public List<Movie> WatchedMovies { get; } = [];

        public string BuildFullName()
        {
            return FirstName + SurName;
        }
    }
}
