using MoviesApi.Application.Dtos.Request;
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
        Task<UserResponseDto> GetByIdAsync(int input);
        Task<List<UserResponseDto>> GetAllAsync();
        Task Add(UserRequestDto input);
    }
}
