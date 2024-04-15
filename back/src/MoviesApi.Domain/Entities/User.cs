using MoviesApi.Domain.Enums;
using MoviesApi.Domain.Interfaces.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Domain.Entities
{
    public  class User : IUser
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = string.Empty;

        public string SurName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public string Token { get; set; } = string.Empty;

        public string EmailConfirmToken { get; set; } = string.Empty;
        public DateTime TokenLifetime { get; set; }

        public DateTime EmailConfirmTokenLifetime { get; set; }

        public EUser UserType { get; set; }

        public bool EmailConfirmed { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime DeleteDate { get; set; }

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
