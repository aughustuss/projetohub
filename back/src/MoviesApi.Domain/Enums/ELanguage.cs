using System.ComponentModel;
using System.Reflection;

namespace MoviesApi.Domain.Enums
{
    public enum ELanguage
    {
        [Description("Português")]
        Portugues = 1,
        [Description("Italiano")]
        Italiano = 2,
        [Description("Inglês")]
        Ingles = 3,
        [Description("Espanhol")]
        Espanhol = 4,
        [Description("Francês")]
        Frances = 5,
        [Description("Alemão")]
        Alemao = 6,
        [Description("Chinês")]
        Chines = 7,
        [Description("Japonês")]
        Japones = 8,
        [Description("Russo")]
        Russo = 9,
        [Description("Árabe")]
        Arabe = 10,
        [Description("Coreano")]
        Coreano = 11,
        [Description("Holandês")]
        Holandes = 12,
        [Description("Hindi")]
        Hindi = 13,
        [Description("Turco")]
        Turco = 14,
        [Description("Sueco")]
        Sueco = 15
    }

    public class LanguageHelper()
    {
        public static string GetLanguageDescription(Enum language)
        {
            FieldInfo value = language.GetType().GetField(language.ToString());

            DescriptionAttribute description = (DescriptionAttribute)value.GetCustomAttribute(typeof(DescriptionAttribute), false);

            return description == null ? language.ToString() : description.Description;
        }
    }
}
