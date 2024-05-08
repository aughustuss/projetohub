using Microsoft.EntityFrameworkCore;
using MoviesApi.Domain.Entities;

namespace MoviesApi.Infrastructure.Context
{
    public class AppDbContext : DbContext
    {
        /**
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=HubMovies;Trusted_Connection=True;TrustServerCertificate=True");
        }
        **/

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<UserFavoriteMovie> UsersFavoriteMovies { get; set; }
        public DbSet<UserWatchedMovie> UsersWatchedMovies { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Rate> Rates { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<User>()
                .HasMany(e => e.Friends)
                .WithMany();

            modelBuilder.Entity<User>()
                .HasMany(e => e.AddedMovies)
                .WithOne(e => e.CreatorUser)
                .HasForeignKey(e => e.CreatorUserId)
                .IsRequired();

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.Comments)
                .WithOne(e => e.Movie)
                .HasForeignKey(e => e.MovieId)
                .IsRequired(false);

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.Rates)
                .WithOne(e => e.Movie)
                .HasForeignKey(e => e.MovieId)
                .IsRequired(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Rates)
                .WithOne(e => e.Author)
                .HasForeignKey(e => e.AuthorId)
                .IsRequired(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Comments)
                .WithOne(e => e.Author)
                .HasForeignKey(e => e.AuthorId)
                .IsRequired(false);

            //Watched List

            modelBuilder.Entity<User>()
                .HasMany(e => e.WatchedMovies)
                .WithMany(e => e.InUsersWatchedList)
                .UsingEntity<UserWatchedMovie>();

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.InUsersWatchedList)
                .WithMany(e => e.WatchedMovies)
                .UsingEntity<UserWatchedMovie>();

            modelBuilder.Entity<UserWatchedMovie>()
                .HasKey(e => new { e.MovieId, e.UserId });

            modelBuilder.Entity<UserWatchedMovie>()
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<UserWatchedMovie>()
                .HasOne(e => e.Movie)
                .WithMany()
                .HasForeignKey(e => e.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            //Favorite 

            modelBuilder.Entity<User>()
                .HasMany(e => e.FavoriteMovies)
                .WithMany(e => e.InUsersFavoriteList)
                .UsingEntity<UserFavoriteMovie>();
                

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.InUsersFavoriteList)
                .WithMany(e => e.FavoriteMovies)
                .UsingEntity<UserFavoriteMovie>();

            modelBuilder.Entity<UserFavoriteMovie>()
                .HasKey(e => new { e.MovieId, e.UserId });

            modelBuilder.Entity<UserFavoriteMovie>()
                .HasOne(e => e.User)
                .WithMany()
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            modelBuilder.Entity<UserFavoriteMovie>()
                .HasOne(e => e.Movie)
                .WithMany()
                .HasForeignKey(e => e.MovieId)
                .OnDelete(DeleteBehavior.ClientSetNull);

        }
    }
}
