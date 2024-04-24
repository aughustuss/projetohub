using Microsoft.AspNetCore.Identity;
using MoviesApi.Application.Interfaces.Security;
using MoviesApi.Domain.Entities;

namespace MoviesApi.Application.Security
{
    public class PasswordHandler : IPasswordHandler<User>
    {
        public string HashPassword(User user, string password)
        {
            var hasher = new PasswordHasher<User>();
            return hasher.HashPassword(user, password);
        }

        public PasswordVerificationResult VerifyHashedPassword(User user, string hashedPassword, string password)
        {
            return new PasswordHasher<User>().VerifyHashedPassword(user, hashedPassword, password);
        }
    }
}
