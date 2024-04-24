using Microsoft.AspNetCore.Identity;

namespace MoviesApi.Application.Interfaces.Security
{
    public interface IPasswordHandler<TUser> where TUser : class
    {
        string HashPassword(TUser user, string password);
        PasswordVerificationResult VerifyHashedPassword(TUser user, string hashedPassword, string password);
    }
}
