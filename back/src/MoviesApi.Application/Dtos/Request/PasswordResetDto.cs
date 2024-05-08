namespace MoviesApi.Application.Dtos.Request
{
    public class PasswordResetDto
    {
        public string ResetPasswordToken { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
