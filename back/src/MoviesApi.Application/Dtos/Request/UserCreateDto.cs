using MoviesApi.Domain.Enums;

namespace MoviesApi.Application.Dtos.Request
{
    public class UserCreateDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string SurName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public EUser Role { get; set; }
    }
}
