using System.ComponentModel;
namespace MoviesApi.Domain.Enums
{
    public enum EMovieStatus
    {
        [Description("Lançado")]
        Released,
        [Description("Não lançado")]
        NotReleased
    }
}
