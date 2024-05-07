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
        public async Task<IActionResult> Create([FromForm] MovieCreateDto input)
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
                response.ForEach(movie =>
                {
                    movie.PosterSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.PosterPath);
                    movie.BackdropSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.BackdropPath);
                });
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
                response.ForEach(movie =>
                {
                    movie.PosterSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.PosterPath);
                    movie.BackdropSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.BackdropPath);
                });
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
                response.ForEach(movie =>
                {
                    movie.PosterSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.PosterPath);
                    movie.BackdropSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.BackdropPath);
                });
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
                response.ForEach(movie =>
                {
                    movie.PosterSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.PosterPath);
                    movie.BackdropSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.BackdropPath);
                });
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
                if(response != null)
                {
                    response.PosterSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, response.PosterPath);
                    response.BackdropSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, response.BackdropPath);
                    if(response.Comments != null)
                    {
                        response.Comments.ForEach(comment =>
                        {
                            comment.Author.ProfileImageSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, comment.Author.ProfileImagePath);
                        });
                    }
                }
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

        [Authorize(Roles = "User,Admin")]
        [HttpGet("movieByName/{input}")]
        public async Task<IActionResult> GetByName(string input)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                var obj = new MovieNameGetDto
                {
                    Name = input,
                    UserId = userId
                };

                var response = await _movieService.GetMoviesByNameAsync(obj);
                response?.ForEach(movie =>
                    {
                        movie.PosterSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.PosterPath);
                        movie.BackdropSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.BackdropPath);
                    });
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
                response.ForEach(movie =>
                {
                    movie.PosterSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.PosterPath);
                    movie.BackdropSource = String.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, movie.BackdropPath);
                });
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
