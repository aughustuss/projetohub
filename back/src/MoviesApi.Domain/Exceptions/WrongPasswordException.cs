using System.Runtime.Serialization;

namespace MoviesApi.Domain.Exceptions
{
    public class WrongPasswordException : Exception
    {
        public WrongPasswordException() { }

        public WrongPasswordException(string message, Exception? exception) : base(message, exception)
        {

        }
    }
}
