using api.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Application.Dtos.Response
{
    public class UserResponseDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string SurName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Token { get; set; } = string.Empty;

        public EUser UserType { get; set; }

        public DateTime? CreationDate { get; set; }

        public DateTime? DeletionDate { get; set; }

    }
}
