using Microsoft.AspNetCore.Authentication;

namespace MoviesApi.Middlewares
{
    public class Token
    {
        private readonly RequestDelegate _next;

        public Token(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var token = httpContext.Request.Headers.Authorization;
            httpContext.Items["Token"] = token;
            await _next(httpContext);
        }
    }
}
