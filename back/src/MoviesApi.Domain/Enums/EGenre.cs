using System.ComponentModel;
using System.Reflection;

namespace MoviesApi.Domain.Enums
{
    public enum EGenre
    {
        [Description("Ação")]
        Acao = 1,
        [Description("Aventura")]
        Aventura = 2,
        [Description("Animação")]
        Animacao = 3,
        [Description("Comédia")]
        Comedia = 4,
        [Description("Crime")]
        Crime = 5,
        [Description("Documentário")]
        Documentario = 6,
        [Description("Drama")]
        Drama = 7,
        [Description("Família")]
        Familia = 8,
        [Description("Fantasia")]
        Fantasia = 9,
        [Description("História")]
        Historia = 10,
        [Description("Terror")]
        Terror = 11,
        [Description("Música")]
        Musica = 12,
        [Description("Mistério")]
        Misterio = 13,
        [Description("Romance")]
        Romance = 14,
        [Description("Ficção científica")]
        FiccaoCientifica = 15,
        [Description("Cinema TV")]
        CinemaTV = 16,
        [Description("Thriller")]
        Thriller = 17,
        [Description("Guerra")]
        Guerra = 18,
        [Description("Faroeste")]
        Faroeste = 19
    }

    public class GenreHelper()
    {
        public static bool GenreExists(string genre)
        {
            foreach(EGenre genreEnum in Enum.GetValues(typeof(EGenre)))
            {
                if (genre.Equals(genreEnum.ToString(), StringComparison.OrdinalIgnoreCase))
                    return true;
            }
            return false;
        }

        public static string GetGenreDescription(Enum genre)
        {
            FieldInfo value = genre.GetType().GetField(genre.ToString());

            DescriptionAttribute description = (DescriptionAttribute)value.GetCustomAttribute(typeof(DescriptionAttribute), false);

            return description == null ? genre.ToString() : description.Description;
        }
    }
}
