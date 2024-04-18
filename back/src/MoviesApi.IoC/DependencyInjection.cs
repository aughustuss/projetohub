using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using MoviesApi.Application.Interfaces;
using MoviesApi.Application.Services;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Repositories;
using AutoMapper;
using MoviesApi.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using MoviesApi.Application.Mappings;

namespace MoviesApi.IoC
{
    public static class DependencyInjection
    {
        public static IServiceCollection ConfigureInjections(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnectionString"), providerOptions => providerOptions.MigrationsAssembly("MoviesApi.Infrastructure")));
            services.AddAutoMapper(typeof(ConfigurationMapping));
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IMapper, Mapper>();

            return services;
        }
    }
}
