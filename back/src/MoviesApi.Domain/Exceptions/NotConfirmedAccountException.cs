namespace MoviesApi.Domain.Exceptions
{
    public class NotConfirmedAccountException : Exception
    {
        public NotConfirmedAccountException() { }

        public NotConfirmedAccountException(string message) : base(message) { }

        public NotConfirmedAccountException(string message, Exception inner) : base(message, inner) { }
    }
}
