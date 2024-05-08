using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace MoviesApi.Application.Dtos.Response
{
    public class UserShortInfoDto
    {
        public int Id { get; set; }
        public string ProfileImagePath { get; set; } = string.Empty;
        public string ProfileImageSource { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;
        public string SurName { get; set; } = string.Empty;
        public string NickName {  get; set; } = string.Empty;
        public string ProfileTitle {  get; set; } = string.Empty;
        public int WatchedMoviesCount { get; set; }
        public int FriendsCount { get; set; }
    }
}
