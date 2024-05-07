using Microsoft.AspNetCore.Http;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Application.Dtos.Response
{
    public class UserInfoDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string SurName { get; set; } = string.Empty;
        public string NickName {  get; set; } = string.Empty;
        public string ProfileTitle {  get; set; } = string.Empty;

        public string ProfileImagePath { get; set; } = string.Empty;
        public string ProfileImageSource {  get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public EUser Role { get; set; }
        public DateTime? CreationDate { get; set; }

        public List<MovieInfoDto>? FavoriteMovies { get; } = [];
        public List<MovieIdDto>? WatchedMovies { get; } = [];
        public int WatchedMoviesCount { get; set; }
        public int Friends {  get; set; }

        //public List<FriendIdDto>? Friends { get; } = [];
    }
}
