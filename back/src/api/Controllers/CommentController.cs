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
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPost("comment")]
        public async Task<IActionResult> CreateComment([FromBody] CommentCreateDto input)
        {
            try
            {
                input.AuthorId = int.Parse(User.FindFirst("Id")!.Value);

                ArgumentNullException.ThrowIfNull(input);

                await _commentService.CreateCommentAsync(input);
                return Ok(new
                {
                    Message = "Comentário criado com sucesso."
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
