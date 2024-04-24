using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MoviesApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class LanguageFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Languages",
                table: "Movies",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "[]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Languages",
                table: "Movies");
        }
    }
}
