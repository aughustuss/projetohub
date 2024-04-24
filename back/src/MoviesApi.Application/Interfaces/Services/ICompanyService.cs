using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Domain.Entities;

namespace MoviesApi.Application.Interfaces.Services
{
    public interface ICompanyService
    {
        Task<List<CompanyDto>> GetAllAsync();
        Task<List<CompanyDto>> GetCompaniesByNameForSearchBoxAsync(string input);
        Task<CompanyDto> GetCompanyByIdAsync(int input);
        Task CreateAsync(CompanyDto input);
        Task DeleteAsync(int input);
    }
}
