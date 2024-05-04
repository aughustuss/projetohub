using Microsoft.AspNetCore.Http;
using MoviesApi.Domain.Enums;
using MoviesApi.Domain.Interfaces.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;

namespace MoviesApi.Domain.Entities
{
    public class User : IUser
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string SurName { get; set; } = string.Empty;
        public string NickName {  get; set; } = string.Empty;
        public string ProfileImagePath {  get; set; } = string.Empty;

        [NotMapped]
        public IFormFile? ProfileImage { get; set; }

        public string? ProfileTitle { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public EUser Role { get; set; }
        public string? Token { get; set; }
        public string? EmailConfirmToken { get; set; }
        public string? ResetPasswordToken { get; set; }
        public DateTime? ResetPasswordTokenLifetime { get; set; }
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

        public string BuildProfileTitle()
        {
            int watchedMoviesCount = WatchedMovies.Count;

            if (watchedMoviesCount >= 0 && watchedMoviesCount <= 25)
                return "Começando a assistir alguns filmes";
            else if (watchedMoviesCount >= 25 && watchedMoviesCount <= 50)
                return "Gosta de assistir filmes";
            else if (watchedMoviesCount >= 50 && watchedMoviesCount <= 100)
                return "Está criando uma paixão por filmes";
            else if (watchedMoviesCount >= 100 && watchedMoviesCount <= 150)
                return "Tem uma paixão por filmes";
            else if (watchedMoviesCount >= 150 && watchedMoviesCount <= 250)
                return "Ama assistir filmes";
            else if (watchedMoviesCount >= 250 && watchedMoviesCount <= 400)
                return "É viciado em filmes";
            else if (watchedMoviesCount >= 400 && watchedMoviesCount <= 500)
                return "Realmente é viciado por filmes, não passa um dia sem ver";
            else if (watchedMoviesCount >= 500 && watchedMoviesCount <= 750)
                return "É um grande cinéfilo";
            else
                return "É um dos maiores cinéfilos que já pisaram na terra";

        }

        public string GenerateToken()
        {
            var tokenBytes = RandomNumberGenerator.GetBytes(64);
            return Convert.ToBase64String(tokenBytes);
        }
    }
}
