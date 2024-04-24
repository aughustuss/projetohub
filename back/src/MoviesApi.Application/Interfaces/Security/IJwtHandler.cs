using MoviesApi.Domain.Entities;

namespace MoviesApi.Application.Interfaces.Security
{
    public interface IJwtHandler
    {
        string CreateToken(User user);
    }
}
