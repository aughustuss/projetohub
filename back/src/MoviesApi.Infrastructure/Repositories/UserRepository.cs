using Microsoft.EntityFrameworkCore;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Exceptions;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Context;

namespace MoviesApi.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;

        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateUserAsync(User input)
        {
            if(await UserExists(input.Email))
                throw new EntityAlreadyExistsException($"Usuário com o email {input.Email} já existe.");
            
            await _dbContext.Users.AddAsync(input);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User> GetUserByIdAsync(int input)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == input);
            return user ?? throw new EntityNotFoundException($"Usuário com o id {input} não foi encontrado.");
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            var users = await _dbContext.Users.ToListAsync();

            if (users.Count == 0)
                throw new EntityNotFoundException("Não há usuários cadastrados.");

            return users;

        }

        private async Task<bool> UserExists(string input)
        {
            return await _dbContext.Users.AnyAsync(u => u.Email == input);
        }

        public async Task AuthenticateUserAsync(User input)
        {
            _dbContext.Users.Update(input);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User> GetUserByEmailAsync(string input)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == input);

            if(user != null) 
                return user;

            throw new EntityNotFoundException($"Não existe um usuário cadastrado com este e-mail.");
        }

        public async Task<List<User>> GetUsersByNameAsync(string input)
        {
            var users = await _dbContext.Users.Where(u => u.FirstName.Contains(input) || u.SurName.Contains(input) || (u.FirstName + " " + u.SurName).Contains(input)).ToListAsync();
            return users ?? throw new EntityNotFoundException($"Nãó há usuários com o nome {input} cadastrados.");
        }

        public async Task UpdateUserAsync(User input)
        {
            _dbContext.Users.Update(input);
            await _dbContext.SaveChangesAsync();
        }

        public async Task AddMovieToUserListAsync(User input)
        {
            _dbContext.Users.Update(input);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<User> GetAllUserInfosByIdAsync(int input)
        {
            var user = await _dbContext.Users.Include(u => u.FavoriteMovies).ThenInclude(m => m.InUsersFavoriteList).Include(u => u.WatchedMovies).Include(u => u.Rates).Include(u => u.Friends).Where(u => u.Id == input).FirstOrDefaultAsync();
            //var text = await _dbContext.UsersFavoriteMovies.Where(u => u.UserId == input && user.FavoriteMovies.Any(m => m.Id == u.MovieId)).ToListAsync();
            return user ?? throw new EntityNotFoundException($"Usuário com o id {input} não foi encontrado.");
        }

    }
}
