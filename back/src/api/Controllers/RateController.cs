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
    public class RateController : ControllerBase
    {

        private readonly IRateService _rateService;

        public RateController(IRateService rateService)
        {
            _rateService = rateService;
        }

        [Authorize(Roles = "Admin, Users")]
        [HttpPost("rate")]
        public async Task<IActionResult> Create(RateCreateDto input)
        {
            try
            {
                var id = int.Parse(User.FindFirst("Id")!.Value);
                input.AuthorId = id;

                ArgumentNullException.ThrowIfNull(input);

                await _rateService.CreateAsync(input);
                return Ok(new
                {
                    Message = "Avaliação cadastrada com sucesso."
                });
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
