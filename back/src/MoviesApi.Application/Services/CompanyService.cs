using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;

namespace MoviesApi.Application.Services
{
    public class CompanyService : ICompanyService
    {

        private readonly IMapper _mapper;
        private readonly ICompanyRepository _companyRepository;

        public CompanyService(IMapper mapper, ICompanyRepository companyRepository)
        {
            _mapper = mapper;
            _companyRepository = companyRepository;
        }

        public async Task CreateAsync(CompanyDto input)
        {
            var company = _mapper.Map<Company>(input);
            await _companyRepository.CreateCompanyAsync(company);
        }

        public Task DeleteAsync(int input)
        {
            throw new NotImplementedException();
        }

        public async Task<List<CompanyDto>> GetAllAsync()
        {
            var companies = await _companyRepository.GetAllCompaniesAsync();
            return _mapper.Map<List<CompanyDto>>(companies);
        }

        public async Task<List<CompanyDto>> GetCompaniesByNameForSearchBoxAsync(string input)
        {
            var companies = await _companyRepository.GetCompaniesByNameForSearchBoxAsync(input);
            return _mapper.Map<List<CompanyDto>>(companies);
        }

        public async Task<CompanyDto> GetCompanyByIdAsync(int input)
        {
            var company = await _companyRepository.GetCompanyByIdAsync(input);
            return _mapper.Map<CompanyDto>(company);
        }
    }
}
