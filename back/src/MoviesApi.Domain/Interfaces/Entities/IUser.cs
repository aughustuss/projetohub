using MoviesApi.Domain.Entities;

namespace MoviesApi.Domain.Interfaces.Entities
{
    public interface IUser
    {
        string HashPassword(string password);
        string UnhashPassword(string password);
    }
}
