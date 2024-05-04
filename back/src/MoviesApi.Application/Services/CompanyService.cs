using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using MoviesApi.Application.Dtos.Request;

namespace MoviesApi.Application.Services
{
    public class CompanyService : ICompanyService
    {

        private readonly IMapper _mapper;
        private readonly ICompanyRepository _companyRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public CompanyService(IMapper mapper, ICompanyRepository companyRepository, IWebHostEnvironment webHostEnvironment)
        {
            _mapper = mapper;
            _companyRepository = companyRepository;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task CreateAsync(CompanyCreateDto input)
        {
            var company = _mapper.Map<Company>(input);
            if(input.Logo != null)
                company.LogoPath = await SaveImage(input.Logo);
            await _companyRepository.CreateCompanyAsync(company);
        }

        public Task DeleteAsync(int input)
        {
            throw new NotImplementedException();
        }

        public async Task<List<CompanyInfoDto>> GetAllAsync()
        {
            var companies = await _companyRepository.GetAllCompaniesAsync();
            return _mapper.Map<List<CompanyInfoDto>>(companies);
        }

        public async Task<List<CompanyInfoDto>> GetCompaniesByNameForSearchBoxAsync(string input)
        {
            var companies = await _companyRepository.GetCompaniesByNameForSearchBoxAsync(input);
            return _mapper.Map<List<CompanyInfoDto>>(companies);
        }

        public async Task<CompanyInfoDto> GetCompanyByIdAsync(int input)
        {
            var company = await _companyRepository.GetCompanyByIdAsync(input);
            return _mapper.Map<CompanyInfoDto>(company);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
