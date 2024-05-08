using MoviesApi.Domain.Entities;

namespace MoviesApi.Domain.Interfaces.Repositories
{
    public interface ICompanyRepository
    {
        Task CreateCompanyAsync(Company input);

        Task<List<Company>> GetAllCompaniesAsync();
        Task<List<Company>> GetCompaniesByNameForSearchBoxAsync(string input);
        Task<Company> GetCompanyByIdAsync(int input);
        Task<bool> CompanyExistsAsync(string input);
        Task DeleteAsync(int input);
    }
}
