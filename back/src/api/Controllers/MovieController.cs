using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Domain.Enums;
using MoviesApi.Domain.Exceptions;
using System.Security.Claims;

namespace MoviesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [Authorize (Roles = "Admin")]
        [HttpPost("movie")]
        public async Task<IActionResult> Create([FromBody] MovieCreateDto input)
        {
            try
            {
                var id = int.Parse(User.FindFirst("Id")!.Value);
                input.CreatorUserId = id;

                ArgumentNullException.ThrowIfNull(input);

                await _movieService.CreateAsync(input);
                return Ok(new
                {
                    Message = "Filme criado com sucesso."
                });
            } catch (EntityAlreadyExistsException ex)
            {
                return BadRequest(ex.Message);
            } catch(EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        [HttpGet("movies")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var response = await _movieService.GetAllAsync();
                return Ok(response);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("upcomingMovies")]
        public async Task<IActionResult> GetUpcomingMovies()
        {
            try
            {
                var response = await _movieService.GetUpcomingMoviesAsync();
                return Ok(response);
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

        [HttpGet("trendingMovies")]
        public async Task<IActionResult> GetTrendingMovies()
        {
            try
            {
                var response = await _movieService.GetTrendingMoviesAsync();
                return Ok(response);
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

        [HttpGet("popularMovies")]
        public async Task<IActionResult> GetPopularMovies()
        {
            try
            {
                var response = await _movieService.GetPopularMoviesAsync();
                return Ok(response);
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

        [HttpGet("movieById/{input}")]
        public async Task<IActionResult> GetById(int input)
        {
            try
            {
                var response = await _movieService.GetAllMovieInfosByIdAsync(input);
                return Ok(response);
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet("movieByName/{input}")]
        public async Task<IActionResult> GetByName(string input)
        {
            try
            {
                var response = await _movieService.GetMoviesByNameAsync(input);
                return Ok(response);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("movieByGenre/{genre}/{page}")]
        public async Task<IActionResult> GetByGenre(EGenre genre, int page)
        {
            try
            {
                var response = await _movieService.GetMoviesByGenreAsync(genre, page);
                return Ok(response);
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

        [HttpGet("movieForSearchBox/{input}")]
        public async Task<IActionResult> GetByNameForSearchBox(string input)
        {
            try
            {
                var response = await _movieService.GetMoviesByNameToSearchBoxAsync(input);
                return Ok(response);
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("movie/{input}")]
        public async Task<IActionResult> Delete(int input)
        {
            try
            {
                await _movieService.DeleteAsync(input);
                return Ok(new
                {
                    Message = "Filme deletado com sucesso."
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
