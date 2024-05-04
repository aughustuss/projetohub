using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Domain.Entities;

namespace MoviesApi.Application.Interfaces.Services
{
    public interface ICompanyService
    {
        Task<List<CompanyInfoDto>> GetAllAsync();
        Task<List<CompanyInfoDto>> GetCompaniesByNameForSearchBoxAsync(string input);
        Task<CompanyInfoDto> GetCompanyByIdAsync(int input);
        Task CreateAsync(CompanyCreateDto input);
        Task DeleteAsync(int input);
    }
}
