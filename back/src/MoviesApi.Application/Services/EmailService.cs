using Microsoft.Extensions.Configuration;
using MimeKit;
using MoviesApi.Application.Interfaces.Services;
using MailKit.Net.Smtp;
using MoviesApi.Domain.Interfaces.Repositories;
using MoviesApi.Application.Dtos.Request;
using MoviesApi.Application.Utils.Models;
using MoviesApi.Application.Utils.EmailBodies;
using System.Security.Cryptography;
namespace MoviesApi.Application.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<bool> SendEmailAsync(Email email)
        {
            var emailObj = new MimeMessage();
            var from = _config.GetValue<string>("EmailSettings:From");
            emailObj.From.Add(new MailboxAddress("HubMovies", from));
            emailObj.To.Add(new MailboxAddress(email.To, email.To));
            emailObj.Subject = email.Subject;
            emailObj.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = string.Format(email.Body)
            };

            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_config.GetValue<string>("EmailSettings:SmtpServer"), 465, true);
                    await client.AuthenticateAsync(_config.GetValue<string>("EmailSettings:From"), _config.GetValue<string>("EmailSettings:Password"));
                    await client.SendAsync(emailObj);
                    return true;
                } catch (Exception)
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }

    }
}
