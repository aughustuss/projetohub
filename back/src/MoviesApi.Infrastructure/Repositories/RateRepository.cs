using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Context;

namespace MoviesApi.Infrastructure.Repositories
{
    public class RateRepository : IRateRepository
    {

        private readonly AppDbContext _dbContext;

        public RateRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateRateAsync(Rate input)
        {
            _dbContext.Rates.Add(input);
            await _dbContext.SaveChangesAsync();
        }
    }
}
