using AutoMapper;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Dtos.Response;
using MoviesApi.Domain.Entities;

namespace MoviesApi.Application.Mappings
{
    public class ConfigurationMapping : Profile
    {
        public ConfigurationMapping()
        {
            CreateMap<User, UserInfoDto>().ReverseMap();
            CreateMap<User, UserCreateDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UserTokenDto>().ReverseMap();
            CreateMap<User, UserShortInfo>().ReverseMap();

            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<Company, CompanyGetDto>().ReverseMap();

            CreateMap<Comment, CommentCreateDto>().ReverseMap();
            CreateMap<Comment, CommentInfoDto>().ReverseMap();

            CreateMap<Rate, RateCreateDto>().ReverseMap();

            CreateMap<Movie, MovieInfoToWatchedListDto>().ReverseMap();
            CreateMap<Movie, MovieGetDto>().ReverseMap();
            CreateMap<Movie, MovieInfoDto>().ReverseMap();
            CreateMap<Movie, MovieCreateDto>().ReverseMap();
            CreateMap<Movie, MovieInfoByIdDto>().ReverseMap();
            CreateMap<Movie, MovieInfoToSearchBoxDto>().ReverseMap();
        }
    }
}
