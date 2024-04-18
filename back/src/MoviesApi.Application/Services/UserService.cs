using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Interfaces;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task Add(UserRequestDto input)
        {
            var user = _mapper.Map<User>(input);
            user.CreationDate = DateTime.UtcNow;
            user.Password = user.HashPassword(input.Password);
            await _userRepository.Add(user);
        }

        public async Task<UserResponseDto> GetByIdAsync(int input)
        {
            var user = await _userRepository.GetByIdAsync(input);
            return _mapper.Map<UserResponseDto>(user);
        }

        public async Task<List<UserResponseDto>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<List<UserResponseDto>>(users);
        }
    }
}
