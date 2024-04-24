using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Exceptions;
using System.Security.Claims;

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

        [HttpPost("user")]
        public async Task<IActionResult> Create([FromBody] UserCreateDto input)
        {
            try
            {
                ArgumentNullException.ThrowIfNull(input);

                await _userService.CreateUserAsync(input);
                return Ok(new
                {
                    Message = "Usuário criado com sucesso.",
                });
            } catch (EntityAlreadyExistsException ex)
            {
                return BadRequest(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPost("favoriteMovies")]
        public async Task<IActionResult> AddMovieToFavoriteList(MovieGetDto input)
        {
            try
            {
                await _userService.AddMovieToFavoriteListAsync(input);
                return Ok(new
                {
                    Message = "Filme adicionado à lista de favoritos com sucesso."
                });
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPost("watchedMovies")]
        public async Task<IActionResult> AddMovieToWatchedList(MovieGetDto input)
        {
            try
            {
                await _userService.AddMovieToWatchedListAsync(input);
                return Ok(new
                {
                    Message = "Filme adicionado à lista de assistidos com sucesso."
                });
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] UserLoginDto input)
        {
            try
            {
                var response = await _userService.AuthenticateUserAsync(input);
                return Ok(response);
            } catch (WrongPasswordException wrongPasswordException)
            {
                return BadRequest(wrongPasswordException.Message);
            } catch (EntityNotFoundException userNotFoundException)
            {
                return NotFound(userNotFoundException.Message);
            }
        }

        [HttpGet("userById/{input}")]
        public async Task<IActionResult> GetById(int input)
        {
            try
            {
                var user = await _userService.GetAllUserInfosByIdAsync(input);
                return Ok(user);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "User, Admin")]
        [HttpGet("usersByName/{input}")]
        public async Task<IActionResult> GetUsersByName(string input)
        {
            try
            {
                var users = await _userService.GetUserByNameAsync(input);
                return Ok(users);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }


    }
}
