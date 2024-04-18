using MoviesApi.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Application.Dtos.Request
{
    public class UserRequestDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string SurName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public EUser UserType { get; set; }
    }
}
