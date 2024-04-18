using Microsoft.EntityFrameworkCore;
using MoviesApi.Domain.Entities;

namespace MoviesApi.Infrastructure.Context
{
    public class AppDbContext : DbContext
    {
        /**protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=HubMovies;Trusted_Connection=True;TrustServerCertificate=True");
        }
        **/
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<MovieCompany> MovieCompanies { get; set; }
        public DbSet<MovieCountry> MovieCountries { get; set; }
        public DbSet<MovieGenre> MovieGenres { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.Genres)
                .WithMany(e => e.Movies)
                .UsingEntity<MovieGenre>();

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.Companies)
                .WithMany(e => e.Movies)
                .UsingEntity<MovieCompany>();

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.Countries)
                .WithMany(e => e.Movies)
                .UsingEntity<MovieCountry>();

            modelBuilder.Entity<User>()
                .HasMany(e => e.AddedMovies)
                .WithOne(e => e.CreatorUser)
                .HasForeignKey(e => e.CreatorUserId)
                .IsRequired();
                
            modelBuilder.Entity<User>()
                .HasMany(e => e.FavoriteMovies)
                .WithOne(e => e.UserWithFavoriteList)
                .HasForeignKey(e => e.UserWithFavoriteListId)
                .IsRequired(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.WatchedMovies)
                .WithOne(e => e.UserWithWatchedList)
                .HasForeignKey(e => e.UserWithWatchedListId)
                .IsRequired(false);
        }
    }
}
