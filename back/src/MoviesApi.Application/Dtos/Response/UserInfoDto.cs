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

        public string Email { get; set; } = string.Empty;
        public EUser Role { get; set; }

        public DateTime? CreationDate { get; set; }
        public List<MovieInfoDto>? FavoriteMovies { get; } = [];
        public List<MovieInfoToWatchedListDto>? WatchedMovies { get; } = [];
    }
}
