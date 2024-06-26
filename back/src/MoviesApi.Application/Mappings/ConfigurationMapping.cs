﻿using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Domain.Entities;
using MoviesApi.Domain.Enums;

namespace MoviesApi.Application.Mappings
{
    public class ConfigurationMapping : Profile
    {
        public ConfigurationMapping()
        {
            CreateMap<User, UserInfoDto>()
                .ForMember(destination => destination.WatchedMoviesCount, origin => origin.MapFrom(w => w.WatchedMovies.Count))
                .ForMember(destination => destination.Friends, origin => origin.MapFrom(f => f.Friends.Count))
                .ForMember(destination => destination.FavoriteGenre, origin => origin.MapFrom(m => GenreHelper.GetGenreDescription(m.FavoriteGenre)))
                .ReverseMap();

            CreateMap<User, UserCreateDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UserTokenDto>().ReverseMap();
            CreateMap<User, UserShortInfoDto>().ReverseMap();
            CreateMap<User, FriendCreateDto>().ReverseMap();
            CreateMap<User, FriendIdDto>().ReverseMap();
            CreateMap<User, UserNameGetDto>().ReverseMap();
            CreateMap<User, UserIdGetDto>().ReverseMap();
            CreateMap<User, UserProfileImageCreateDto>().ReverseMap();
            CreateMap<User, UserIdDto>().ReverseMap();

            CreateMap<Company, CompanyInfoDto>().ReverseMap();
            CreateMap<Company, CompanyCreateDto>().ReverseMap();
            CreateMap<Company, CompanyGetDto>().ReverseMap();

            CreateMap<Comment, CommentCreateDto>().ReverseMap();
            CreateMap<Comment, CommentInfoDto>().ReverseMap();

            CreateMap<Rate, RateCreateDto>().ReverseMap();

            CreateMap<Movie, MovieNameGetDto>().ReverseMap();

            CreateMap<Movie, MovieIdDto>()
                .ForMember(destination => destination.Genres, origin => origin.MapFrom(m => m.Genres.Select(g => GenreHelper.GetGenreDescription(g)).ToList()))
                .ReverseMap();

            CreateMap<Movie, MovieInfoToWatchedListDto>().ReverseMap();
            CreateMap<Movie, MovieGetDto>().ReverseMap();

            CreateMap<Movie, MovieInfoDto>()
                .ForMember(destination => destination.Genres, options => options.MapFrom(g => g.Genres.Select(g => GenreHelper.GetGenreDescription(g)).ToList()))
                .ReverseMap();

            //CreateMap<Movie, MovieCreateDto>().ReverseMap();

            CreateMap<Movie, MovieInfoByIdDto>()
                .ForMember(destination => destination.Languages, options => options.MapFrom(g => g.Languages.Select(l => LanguageHelper.GetLanguageDescription(l)).ToList()))
                .ForMember(destination => destination.Genres, options => options.MapFrom(g => g.Genres.Select(g => GenreHelper.GetGenreDescription(g)).ToList()))
                .ReverseMap();

            CreateMap<Movie, MovieInfoToSearchBoxDto>().ReverseMap();


            CreateMap<int, Company>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src));

            CreateMap<MovieCreateDto, Movie>()
                .ForMember(dest => dest.Companies, opt => opt.MapFrom(src => src.Companies));

            CreateMap<Movie, MovieCreateDto>()
                .ForMember(dest => dest.Companies, opt => opt.MapFrom(src => src.Companies));


            CreateMap<Chat, ChatCreateDto>().ReverseMap();
            CreateMap<Chat, ChatInfoDto>().ReverseMap();
            CreateMap<Chat, ChatGetDto>().ReverseMap();
            CreateMap<Chat, ChatInfoMessagesDto>().ReverseMap();

            CreateMap<Message, MessageCreateDto>().ReverseMap();
            CreateMap<Message, MessageInfoDto>().ReverseMap();
        }
    }
}
