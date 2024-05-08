using MoviesApi.Application.Utils.Models;

namespace MoviesApi.Application.Utils.EmailBodies
{
    public class ResetPasswordEmailBody
    {
        public static string ResetPasswordEmail(string email, string token)
        {
            return $@"
<html lang=""pt-br"">
<head>
</head>
<link rel=""preconnect"" href=""https://fonts.googleapis.com"">
<link rel=""preconnect"" href=""https://fonts.gstatic.com"" crossorigin>
<link href=""https://fonts.googleapis.com/css2?family=Inter&display=swap"" rel=""stylesheet"">
<body>
  <div stlye=""display: flex; flex-direction: column; justify-content: center; align-content: center; align-items: center; gap: 20px; font-family: 'Inter', sans-serif;"">
    <h1 style=""font-weight: 800; width: 400px"">
    Redefina sua senha
  </h1>
  <a href=""http://127.0.0.1:5173/resetPassword?email={email}&code={token}"" target=""_blank"" style=""padding: 10px; border:none; background-color:#116149; border-radius: 5px; color: white; text-decoration:none; font-size: 12px;"">
    Clique aqui para redefinir sua senha
  </a>
    <p>
      ou clique no link abaixo: 
      <p/>
    <a href=""http://127.0.0.1:5173/resetPassword?email={email}&code={token}"">
      http://127.0.0.1:5173/resetPassword?email={email}&code={token}
    </a>
  </div>
</body>
</html>
";
        }
    }
}
