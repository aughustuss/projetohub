using MoviesApi.Domain.Entities;

namespace MoviesApi.Domain.Interfaces.Entities
{
    public interface IUser
    {
        string BuildFullName();
        string BuildProfileTitle();
        string GenerateToken();
    }
}
