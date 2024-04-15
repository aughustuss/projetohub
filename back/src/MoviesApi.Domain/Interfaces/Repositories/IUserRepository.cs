using MoviesApi.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Domain.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User> Get(int id);
        Task<List<User>> GetAll();
    }
}
