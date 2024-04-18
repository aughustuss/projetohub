using Microsoft.EntityFrameworkCore;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Exceptions;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MoviesApi.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;
        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task Add(User user)
        {
            if(await UserExists(user.Email))
                throw new UserAlreadyExistsException($"Usuário com o email {user.Email} já existe.");
            
            await _dbContext.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            var user = await _dbContext.Users.FindAsync(id);
            return user ?? throw new UserNotFoundException($"Usuário com o id {id} não foi encontrado.");
        }

        public Task<List<User>> GetAllAsync()
        {
            return _dbContext.Users.ToListAsync();
        }

        public async Task<bool> UserExists(string email)
        {
            return await _dbContext.Users.AnyAsync(u => u.Email == email);
        }
    }
}
