using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoviesApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AgeAttribute : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAdult",
                table: "Movies");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Movies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Movies");

            migrationBuilder.AddColumn<bool>(
                name: "IsAdult",
                table: "Movies",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
