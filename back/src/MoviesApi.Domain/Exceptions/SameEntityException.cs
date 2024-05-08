namespace MoviesApi.Domain.Exceptions
{
    public class SameEntityException : Exception
    {
        public SameEntityException() { }

        public SameEntityException(string message) : base(message) { }

        public SameEntityException(string message, Exception inner) : base(message, inner) { }
    }
}
