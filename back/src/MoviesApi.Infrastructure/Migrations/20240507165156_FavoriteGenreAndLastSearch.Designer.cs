﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MoviesApi.Infrastructure.Context;

#nullable disable

namespace MoviesApi.Infrastructure.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240507165156_FavoriteGenreAndLastSearch")]
    partial class FavoriteGenreAndLastSearch
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CompanyMovie", b =>
                {
                    b.Property<int>("CompaniesId")
                        .HasColumnType("int");

                    b.Property<int>("MoviesId")
                        .HasColumnType("int");

                    b.HasKey("CompaniesId", "MoviesId");

                    b.HasIndex("MoviesId");

                    b.ToTable("CompanyMovie");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.Comment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("MovieId")
                        .HasColumnType("int");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("MovieId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.Company", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("LogoPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OriginalCountry")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BackdropPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Budget")
                        .HasColumnType("float");

                    b.Property<int>("CreatorUserId")
                        .HasColumnType("int");

                    b.Property<string>("Genres")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("HasVideo")
                        .HasColumnType("bit");

                    b.Property<string>("Homepage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImdbId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsAdult")
                        .HasColumnType("bit");

                    b.Property<string>("Languages")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OriginalLanguage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OriginalTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Overview")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("Popularity")
                        .HasColumnType("float");

                    b.Property<string>("PosterPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ReleaseDate")
                        .HasColumnType("datetime2");

                    b.Property<double>("Revenue")
                        .HasColumnType("float");

                    b.Property<double>("Runtime")
                        .HasColumnType("float");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Tagline")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double?>("VoteAverage")
                        .HasColumnType("float");

                    b.Property<int?>("VoteCount")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CreatorUserId");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.Rate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("MovieId")
                        .HasColumnType("int");

                    b.Property<double>("Vote")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("MovieId");

                    b.ToTable("Rates");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool?>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeleteDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmailConfirmToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("EmailConfirmTokenLifetime")
                        .HasColumnType("datetime2");

                    b.Property<int>("FavoriteGenre")
                        .HasColumnType("int");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastSearchedTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NickName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfileImagePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfileTitle")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ResetPasswordToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ResetPasswordTokenLifetime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("SurName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("TokenLifetime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.UserFavoriteMovie", b =>
                {
                    b.Property<int>("MovieId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("AddedDate")
                        .HasColumnType("datetime2");

                    b.HasKey("MovieId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UsersFavoriteMovies");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.UserWatchedMovie", b =>
                {
                    b.Property<int>("MovieId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("MovieId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UsersWatchedMovies");
                });

            modelBuilder.Entity("UserUser", b =>
                {
                    b.Property<int>("FriendsId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("FriendsId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("UserUser");
                });

            modelBuilder.Entity("CompanyMovie", b =>
                {
                    b.HasOne("MoviesApi.Domain.Entities.Company", null)
                        .WithMany()
                        .HasForeignKey("CompaniesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MoviesApi.Domain.Entities.Movie", null)
                        .WithMany()
                        .HasForeignKey("MoviesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.Comment", b =>
                {
                    b.HasOne("MoviesApi.Domain.Entities.User", "Author")
                        .WithMany("Comments")
                        .HasForeignKey("AuthorId");

                    b.HasOne("MoviesApi.Domain.Entities.Movie", "Movie")
                        .WithMany("Comments")
                        .HasForeignKey("MovieId");

                    b.Navigation("Author");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.Movie", b =>
                {
                    b.HasOne("MoviesApi.Domain.Entities.User", "CreatorUser")
                        .WithMany("AddedMovies")
                        .HasForeignKey("CreatorUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatorUser");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.Rate", b =>
                {
                    b.HasOne("MoviesApi.Domain.Entities.User", "Author")
                        .WithMany("Rates")
                        .HasForeignKey("AuthorId");

                    b.HasOne("MoviesApi.Domain.Entities.Movie", "Movie")
                        .WithMany("Rates")
                        .HasForeignKey("MovieId");

                    b.Navigation("Author");

                    b.Navigation("Movie");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.UserFavoriteMovie", b =>
                {
                    b.HasOne("MoviesApi.Domain.Entities.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .IsRequired();

                    b.HasOne("MoviesApi.Domain.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("User");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.UserWatchedMovie", b =>
                {
                    b.HasOne("MoviesApi.Domain.Entities.Movie", "Movie")
                        .WithMany()
                        .HasForeignKey("MovieId")
                        .IsRequired();

                    b.HasOne("MoviesApi.Domain.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .IsRequired();

                    b.Navigation("Movie");

                    b.Navigation("User");
                });

            modelBuilder.Entity("UserUser", b =>
                {
                    b.HasOne("MoviesApi.Domain.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("FriendsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MoviesApi.Domain.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.Movie", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Rates");
                });

            modelBuilder.Entity("MoviesApi.Domain.Entities.User", b =>
                {
                    b.Navigation("AddedMovies");

                    b.Navigation("Comments");

                    b.Navigation("Rates");
                });
#pragma warning restore 612, 618
        }
    }
}
