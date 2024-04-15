using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Interfaces;
using MoviesApi.Domain.Entities;

namespace MoviesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        [HttpGet("user")]
        public IActionResult Get()
        {
             
        }
    }
}
