using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Interfaces;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Exceptions;

namespace MoviesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserService _userService;
       
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("userById/{input}")]
        public async Task<IActionResult> GetById(int input)
        {
            try
            {
                var user = await _userService.GetByIdAsync(input);
                return Ok(user);
            } catch (UserNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("user")]
        public async Task<IActionResult> Add([FromBody] UserRequestDto input)
        {
            try
            {
                await _userService.Add(input);
                return Ok();
            } catch (UserAlreadyExistsException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
