using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Domain.Exceptions;

namespace MoviesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService _companyService;

        public CompanyController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("company")]
        public async Task<IActionResult> Create([FromBody] CompanyDto input)
        {
            try
            {
                ArgumentNullException.ThrowIfNull(input);

                await _companyService.CreateAsync(input);
                return Ok(new
                {
                    Message = "Produtora criada com sucesso."
                });
            } catch (EntityAlreadyExistsException ex)
            {
                return BadRequest(ex.Message);
            } catch(EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("companies")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var response = await _companyService.GetAllAsync();
                return Ok(response);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("companyByName/{input}")]
        public async Task<IActionResult> GetCompanyByName(string input)
        {
            try
            {
                var response = await _companyService.GetCompaniesByNameForSearchBoxAsync(input);
                return Ok(response);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
