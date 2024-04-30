﻿namespace MoviesApi.Domain.Exceptions
{
    public class ExpiredTokenException : Exception
    {
        public ExpiredTokenException() { }

        public ExpiredTokenException(string message) : base(message) { }

        public ExpiredTokenException(string message, Exception inner) : base(message, inner) { }
    }
}
