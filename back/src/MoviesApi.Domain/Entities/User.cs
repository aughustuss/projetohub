using Microsoft.AspNetCore.Http;
using MoviesApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;

namespace MoviesApi.Domain.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string SurName { get; set; } = string.Empty;
        public string NickName {  get; set; } = string.Empty;
        
        public string ProfileImagePath {  get; set; } = string.Empty;

        [NotMapped]
        public IFormFile? ProfileImage { get; set; }

        [NotMapped]
        public string ImageSource { get; set; } = string.Empty;

        public string? LastSearchedTitle {  get; set; } = string.Empty;
        public EGenre FavoriteGenre {  get; set; }
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

        public ICollection<Message> Messages { get; } = new List<Message>();
        public ICollection<Chat> Chats { get; } = new List<Chat>();

    }
}
