using System.ComponentModel;

namespace MoviesApi.Domain.Enums
{
    public enum EUser
    {
        [Description("Administrador")]
        Admin,
        [Description("Usuário")]
        User
    }
}
