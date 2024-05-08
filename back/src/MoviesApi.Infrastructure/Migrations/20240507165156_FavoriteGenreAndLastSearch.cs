using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoviesApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FavoriteGenreAndLastSearch : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FavoriteGenre",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "LastSearchedTitle",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FavoriteGenre",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastSearchedTitle",
                table: "Users");
        }
    }
}
