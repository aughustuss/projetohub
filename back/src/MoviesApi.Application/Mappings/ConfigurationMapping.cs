using AutoMapper;
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
                .ReverseMap();

            CreateMap<User, UserCreateDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UserTokenDto>().ReverseMap();
            CreateMap<User, UserShortInfoDto>().ReverseMap();
            CreateMap<User, FriendCreateDto>().ReverseMap();
            CreateMap<User, FriendIdDto>().ReverseMap();

            CreateMap<Company, CompanyInfoDto>().ReverseMap();
            CreateMap<Company, CompanyCreateDto>().ReverseMap();
            CreateMap<Company, CompanyGetDto>().ReverseMap();

            CreateMap<Comment, CommentCreateDto>().ReverseMap();
            CreateMap<Comment, CommentInfoDto>().ReverseMap();

            CreateMap<Rate, RateCreateDto>().ReverseMap();

            CreateMap<Movie, MovieIdDto>()
                .ForMember(destination => destination.Genres, origin => origin.MapFrom(m => m.Genres.Select(g => GenreHelper.GetGenreDescription(g)).ToList()))
                .ReverseMap();

            CreateMap<Movie, MovieInfoToWatchedListDto>().ReverseMap();
            CreateMap<Movie, MovieGetDto>().ReverseMap();

            CreateMap<Movie, MovieInfoDto>()
                .ForMember(destination => destination.Genres, options => options.MapFrom(g => g.Genres.Select(g => GenreHelper.GetGenreDescription(g)).ToList()))
                .ReverseMap();
            CreateMap<Movie, MovieCreateDto>().ReverseMap();
            CreateMap<Movie, MovieInfoByIdDto>()
                .ForMember(destination => destination.Languages, options => options.MapFrom(g => g.Languages.Select(l => LanguageHelper.GetLanguageDescription(l)).ToList()))
                .ForMember(destination => destination.Genres, options => options.MapFrom(g => g.Genres.Select(g => GenreHelper.GetGenreDescription(g)).ToList()))
                .ReverseMap();

            CreateMap<Movie, MovieInfoToSearchBoxDto>().ReverseMap();
        }
    }
}
