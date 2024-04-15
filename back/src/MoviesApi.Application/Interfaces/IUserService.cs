using MoviesApi.Application.Dtos.Response;
using MoviesApi.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Application.Interfaces
{
    public interface IUserService
    {
        Task<User> Get(int id);
        Task<List<User>> GetAll();
    }
}
