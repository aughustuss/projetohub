namespace MoviesApi.Application.Dtos.Response
{
    public class UserShortInfo
    {
        public string FirstName { get; set; } = string.Empty;
        public string SurName { get; set; } = string.Empty;
        public string ProfileTitle {  get; set; } = string.Empty;
        public int WatchedMoviesCount { get; set; }
        public int FriendsCount { get; set; }
    }
}
