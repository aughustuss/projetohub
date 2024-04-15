using api.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Application.Dtos.Request
{
    public class UserRequestDto
    {
        string FirstName { get; set; } = string.Empty;

        string SurName { get; set; } = string.Empty;

        string Email { get; set; } = string.Empty;

        string Password { get; set; } = string.Empty;

        EUser UserType { get; set; }
    }
}
