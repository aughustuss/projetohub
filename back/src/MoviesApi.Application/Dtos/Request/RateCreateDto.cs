namespace MoviesApi.Application.Dtos.Request
{
    public class RateCreateDto
    {
        public double Vote { get; set; }
        public DateTime CreationDate { get; set; }
        public int AuthorId { get; set; }
        public int MovieId { get; set; }
    }
}
