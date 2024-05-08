using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Application.Services;
using MoviesApi.Domain.Exceptions;

namespace MoviesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hub;
        private readonly IChatService _chatService;
        private readonly IUserService _userService;

        public ChatController(IHubContext<ChatHub> hub, IChatService chatService, IUserService userService)
        {
            _hub = hub;
            _chatService = chatService;
            _userService = userService;
        }

        [HttpPost("message")]
        public async Task<IActionResult> SendMessage([FromBody] MessageCreateDto input)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                input.UserId = userId;
                await _chatService.SendMessageAsync(input);
                return Ok(new
                {
                    Message = "Mensagem enviada com sucesso."
                });
            } catch(EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "User,Admin")]
        [HttpPost("chat")]
        public async Task<IActionResult> CreateRoom([FromBody] ChatCreateDto input)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                await _chatService.CreateRoomAsync(input);
                return Ok(new
                {
                    Message = "Sala criada com sucesso."
                });
            } catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            } catch (EntityAlreadyExistsException ex)
            {
                return BadRequest(ex.Message);
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet("{input}")]
        public async Task<IActionResult> GetChatById(int input)
        {
            try
            {
                var response = await _chatService.GetChatMessagesById(input);
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

    }
}
