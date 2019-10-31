using Microsoft.EntityFrameworkCore.Migrations;

namespace Airballs.API.Migrations
{
    public partial class AirballoonsChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Airballs",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Airballs",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Airballs",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Airballs");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Airballs");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Airballs");
        }
    }
}
