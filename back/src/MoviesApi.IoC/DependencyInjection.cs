using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using MoviesApi.Application.Services;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Infrastructure.Repositories;
using AutoMapper;
using MoviesApi.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using MoviesApi.Application.Mappings;
using MoviesApi.Application.Security;
using MoviesApi.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MoviesApi.Application.Interfaces.Security;
using MoviesApi.Application.Interfaces.Services;
using MailKit;
using Microsoft.AspNetCore.Hosting;

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
            services.AddScoped<IMovieService, MovieService>();
            services.AddScoped<IMovieRepository, MovieRepository>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<IRateService, RateService>();
            services.AddScoped<IRateRepository, RateRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IUserFavoriteMovieRepository, UserFavoriteMovieRepository>();
            
            services.AddScoped<IPasswordHandler<User>, PasswordHandler>();
            services.AddScoped<IMapper, Mapper>();

            services.AddScoped<IEmailService, EmailService>();
            
            services.AddCors(options =>
            {
                options.AddPolicy(name: "hub_movies_cors_origin", policy =>
                {
                    policy.WithOrigins("http://127.0.0.1:5173").AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });

            services.Configure<IdentityOptions>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.User.RequireUniqueEmail = true;
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequireUppercase = true;
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.IncludeErrorDetails = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ClockSkew = TimeSpan.Zero,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration.GetValue<string>("JwtTokensSettings:ValidIssuer"),
                    ValidAudience = configuration.GetValue<string>("JwtTokensSettings:ValidAudience"),
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("JwtTokensSettings:SymmetricSecurityKey")!))
                };
            }) ;
            services.AddScoped<IJwtHandler, JwtHandler>();
            return services;
        }
    }
}
