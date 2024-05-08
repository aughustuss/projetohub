using Microsoft.Extensions.Logging;
using MoviesApi.Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Text;
using MoviesApi.Application.Interfaces.Security;

namespace MoviesApi.Application.Security
{
    public class JwtHandler : IJwtHandler
    {
        private readonly int _expirationTime = 2;
        private readonly ILogger<JwtHandler> _logger;
        private readonly IConfiguration _configuration;

        public JwtHandler(ILogger<JwtHandler> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public string CreateToken(User user)
        {
            var expiration = DateTime.UtcNow.AddDays(_expirationTime);
            var token = CreateJwtToken(CreateClaims(user), CreateCredentials(), expiration);

            var tokenHandler = new JwtSecurityTokenHandler();

            _logger.LogInformation("Token criado.");

            return tokenHandler.WriteToken(token);
        }

        private JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials, DateTime expiration) =>
            new(
                _configuration.GetValue<string>("JwtTokensSettings:ValidIssuer"),
                _configuration.GetValue<string>("JwtTokensSettings:ValidAudience"),
                claims,
                expires: expiration,
                signingCredentials: credentials
                );

        private List<Claim> CreateClaims(User user)
        {
            var jwtSub = _configuration.GetValue<string>("JwtTokensSettings:JwtRegisteredClaimNamesSub")!;
            
            try
            {
                var claims = new List<Claim>
                {
                    new(JwtRegisteredClaimNames.Sub, jwtSub),
                    new("Id", $"{user.Id}"),
                    new(ClaimTypes.Name, $"{user.FirstName} {user.SurName}"),
                    new(ClaimTypes.Email, user.Email),
                    new(ClaimTypes.Role, $"{user.Role}")
                };

                return claims;

            } catch (Exception)
            {
                throw;
            }
        }

        private SigningCredentials CreateCredentials()
        {
            var symmetricSecurityKey = _configuration.GetValue<string>("JwtTokensSettings:SymmetricSecurityKey")!;

            return new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(symmetricSecurityKey)), SecurityAlgorithms.HmacSha256);
        }

    }
}
