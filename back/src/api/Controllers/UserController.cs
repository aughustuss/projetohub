﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Application.Utils.Models;
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
        private readonly IEmailService _emailService;

        public UserController(IUserService userService, IEmailService emailService)
        {
            _userService = userService;
            _emailService = emailService;
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
        public async Task<IActionResult> AddMovieToFavoriteList([FromBody] int input)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                var obj = new MovieGetDto
                {
                    UserId = userId,
                    MovieId = input
                };
                await _userService.AddMovieToFavoriteListAsync(obj);
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
        [HttpDelete("favoriteMovie/{input}")]
        public async Task<IActionResult> RemoveMovieFromFavoriteList(int input)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                var obj = new MovieGetDto
                {
                    MovieId = input,
                    UserId = userId
                };
                await _userService.RemoveMovieFromFavoriteListAsync(obj);
                return Ok(new
                {
                    Message = "Filme excluído da lista de favoritos."
                });
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPost("watchedMovies")]
        public async Task<IActionResult> AddMovieToWatchedList([FromBody] int input)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                var obj = new MovieGetDto
                {
                    MovieId = input,
                    UserId = userId
                };
                await _userService.AddMovieToWatchedListAsync(obj);
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
            } catch(NotConfirmedAccountException ex)
            {
                return BadRequest(ex.Message);
            } catch (WrongEntryException wrongPasswordException)
            {
                return BadRequest(wrongPasswordException.Message);
            } catch (EntityNotFoundException userNotFoundException)
            {
                return NotFound(userNotFoundException.Message);
            }
        }

        [Authorize(Roles = "User,Admin")]
        [HttpPost("friend")]
        public async Task<IActionResult> AddNewFriend([FromBody] int input)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                var obj = new FriendCreateDto
                {
                    UserId = userId,
                    FriendId = input
                };

                await _userService.AddUserToFriendListAsync(obj);
                return Ok(new
                {
                    Message = "Usuário adicionado à lista de amigos com sucesso."
                });
            } catch (SameEntityException ex)
            {
                return BadRequest(ex.Message);
            } catch(EntityAlreadyExistsException ex)
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

        [Authorize(Roles = "User, Admin")]
        [HttpGet("user")]
        public async Task<IActionResult> GetById()
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                var user = await _userService.GetAllUserInfosByIdAsync(userId);
                return Ok(user);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet("user/role")]
        public async Task<IActionResult> CheckUserRole()
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                var response = await _userService.CheckUserRoleAsync(userId);
                return Ok(response);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet("user/favoriteMovies")]
        public async Task<IActionResult> GetUserFavoriteListCount()
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                var response = await _userService.GetUserFavoriteListCountAsync(userId); 
                return Ok(response);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("users")]
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

        [Authorize(Roles = "User, Admin")]
        [HttpGet("user/rate/{input}")]
        public async Task<IActionResult> CheckIfUserRatedMovie(int input)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);

                var obj = new MovieGetDto
                {
                    MovieId = input,
                    UserId = userId
                };

                var response = await _userService.CheckIfUserRatedMovieAsync(obj);
                return Ok(response);

            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordEmailRequest  input)
        {
            try
            {
                var response = await _userService.SendResetPasswordEmailAsync(input);
                return Ok(response);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] PasswordResetDto input)
        {
            try
            {
                await _userService.ResetPassword(input);
                return Ok(new
                {
                    Message = "Senha alterada com sucesso."
                });
            } catch(EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("confirmAccount")]
        public async Task<IActionResult> ConfirmAccount([FromBody] EmailRequest input)
        {
            try
            {
                await _userService.ConfirmUserAccountAsync(input);
                return Ok(new
                {
                    Message = "Conta confirmada com sucesso."
                });
            } catch (WrongEntryException ex)
            {
                return BadRequest(ex.Message);
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
