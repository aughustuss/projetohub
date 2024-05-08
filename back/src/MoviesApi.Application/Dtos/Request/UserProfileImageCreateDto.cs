using Microsoft.AspNetCore.Http;

namespace MoviesApi.Application.Dtos.Request
{
    public class UserProfileImageCreateDto
    {
        public int UserId { get; set; }
        public IFormFile? ProfileImage { get; set; } = null;
    }
}
