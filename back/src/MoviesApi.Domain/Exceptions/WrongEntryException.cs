
namespace MoviesApi.Domain.Exceptions
{
    public class WrongEntryException : Exception
    {
        public WrongEntryException() { }

        public WrongEntryException(string message) : base(message) { }

        public WrongEntryException(string message, Exception inner) : base(message, inner) { }
    }
}
