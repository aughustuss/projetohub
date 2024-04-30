using System.ComponentModel;
using System.Reflection;

namespace MoviesApi.Domain.Enums
{
    public enum ELanguage
    {
        [Description("Português")]
        Portugues,
        [Description("Italiano")]
        Italiano,
        [Description("Inglês")]
        Ingles,
        [Description("Espanhol")]
        Espanhol,
        [Description("Francês")]
        Frances,
        [Description("Alemão")]
        Alemao,
        [Description("Chinês")]
        Chines,
        [Description("Japonês")]
        Japones,
        [Description("Russo")]
        Russo,
        [Description("Árabe")]
        Arabe,
        [Description("Coreano")]
        Coreano,
        [Description("Holandês")]
        Holandes,
        [Description("Hindi")]
        Hindi,
        [Description("Turco")]
        Turco,
        [Description("Sueco")]
        Sueco
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
