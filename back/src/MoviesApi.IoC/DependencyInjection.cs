using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MoviesApi.Application.Interfaces;
using MoviesApi.Application.Services;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Repositories;
using AutoMapper;

namespace MoviesApi.IoC
{
    public static class DependencyInjection
    {
        public static IServiceCollection ConfigureInjections(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IMapper, Mapper>();

            return services;
        }
    }
}
