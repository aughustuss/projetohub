using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Application.Interfaces.Services;
using MoviesApi.Application.Utils.Models;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Interfaces.Repositories;

namespace MoviesApi.Application.Services
{
    public class ChatService : IChatService
    {

        private readonly IMapper _mapper;
        private readonly IChatRepository _chatRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMessageRepository _messageRepository;

        public ChatService(IMapper mapper, IChatRepository chatRepository, IUserRepository userRepository, IMessageRepository messageRepository)
        {
            _mapper = mapper;
            _chatRepository = chatRepository;
            _userRepository = userRepository;
            _messageRepository = messageRepository;
        }

        public async Task CreateRoomAsync(ChatCreateDto input)
        {
            var chat = _mapper.Map<Chat>(input);
            chat.Users.Clear();
            foreach(var item in input.Users)
            {
                var user = await _userRepository.GetUserByIdAsync(item.Id);
                chat.Users.Add(user);
                chat.ChatName += chat.Id;
            }
            await _chatRepository.CreateRoomAsync(chat);
        }

        public async Task<ChatInfoDto> GetChatByIdAsync(int input)
        {
            var chat = await _chatRepository.GetChatByIdAsync(input);

            return _mapper.Map<ChatInfoDto>(chat);
        }

        public async Task<ChatInfoMessagesDto> GetChatMessagesById(int input)
        {
            var chat = await _chatRepository.GetChatByIdAsync(input);

            return _mapper.Map<ChatInfoMessagesDto>(chat);
        }

        public Task JoinChatAsync(UserConnection connection)
        {
            throw new NotImplementedException();
        }

        public async Task SendMessageAsync(MessageCreateDto input)
        {
            var user = await _userRepository.GetUserByIdAsync(input.UserId);
            var chat = await _chatRepository.GetChatByIdAsync(input.ChatId);
            var message = new Message
            {
                Content = input.Content,
                SendDate = DateTime.UtcNow,
                Chat = chat,
                User = user,
            };
            await _messageRepository.AddMessageAsync(message);
        }
    }
}
