using Microsoft.EntityFrameworkCore;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Exceptions;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Context;

namespace MoviesApi.Infrastructure.Repositories
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly AppDbContext _dbContext;

        public CompanyRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CompanyExistsAsync(string input)
        {
            return await _dbContext.Companies.AnyAsync(c => c.Name == input);
        }

        public async Task CreateCompanyAsync(Company input)
        {
            if (await CompanyExistsAsync(input.Name))
                throw new EntityAlreadyExistsException($"Produtora com o nome {input.Name} já foi cadastrada.");

            await _dbContext.Companies.AddAsync(input);
            await _dbContext.SaveChangesAsync();
        }

        public Task DeleteAsync(int input)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Company>> GetAllCompaniesAsync()
        {
            var companies = await _dbContext.Companies.ToListAsync();

            if (companies.Count == 0)
                throw new EntityNotFoundException($"Não foram encontradas produtoras.");

            return companies;
        }

        public async Task<List<Company>> GetCompaniesByNameForSearchBoxAsync(string input)
        {
            var companies = await _dbContext.Companies.Where(c => c.Name.Contains(input)).ToListAsync();

            if (companies.Count == 0)
                throw new EntityNotFoundException($"Não foram encontradas produtoras com o nome {input}.");
            
            return companies;
        }

        public async Task<Company> GetCompanyByIdAsync(int input)
        {
            var company = await _dbContext.Companies.FirstOrDefaultAsync(c => c.Id == input);
            return company ?? throw new EntityNotFoundException($"Produtora com o id {input} não foi encontrada.");
        }
    }
}
