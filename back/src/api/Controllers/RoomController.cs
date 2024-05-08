using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Application.Services;
using MoviesApi.Domain.Exceptions;
using MoviesApi.Infrastructure.Context;

namespace MoviesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hub;
        private readonly IChatService _chatService;

        public RoomController(IHubContext<ChatHub> hub, IChatService chatService)
        {
            _hub = hub;
            _chatService = chatService;
        }

        [HttpPost("join")]
        public async Task<IActionResult> JoinRoom([FromBody] string roomId, string roomName)
        {
            await _hub.Groups.AddToGroupAsync(roomId, roomName);
            return Ok();
        }

        [HttpPost("leave")]
        public async Task<IActionResult> LeaveRoom([FromBody] string roomId, string roomName)
        {
            await _hub.Groups.RemoveFromGroupAsync(roomId, roomName);
            return Ok();
        }

        [HttpPost("sendMessage")]
        public async Task<IActionResult> SendMessage(string message, string roomName, int chatId, [FromServices] AppDbContext _dbContext)
        {
            try
            {
                var userId = int.Parse(User.FindFirst("Id")!.Value);
                var newMessage = new MessageCreateDto
                {
                    ChatId = chatId,
                    Content = message,
                    UserId = userId,
                };
                await _chatService.SendMessageAsync(newMessage);
                await _hub.Clients.Group(roomName).SendAsync("ReceiveMessage", message);
                return Ok();
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
