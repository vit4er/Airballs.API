using Microsoft.EntityFrameworkCore.Migrations;

namespace Airballs.API.Migrations
{
    public partial class AirballColor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Color",
                table: "Airballs",
                newName: "ColorCode");

            migrationBuilder.AlterColumn<string>(
                name: "ColorCode",
                table: "Airballs",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Airballs_ColorCode",
                table: "Airballs",
                column: "ColorCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Airballs_Colors_ColorCode",
                table: "Airballs",
                column: "ColorCode",
                principalTable: "Colors",
                principalColumn: "Code",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Airballs_Colors_ColorCode",
                table: "Airballs");

            migrationBuilder.DropIndex(
                name: "IX_Airballs_ColorCode",
                table: "Airballs");

            migrationBuilder.RenameColumn(
                name: "ColorCode",
                table: "Airballs",
                newName: "Color");

            migrationBuilder.AlterColumn<string>(
                name: "Color",
                table: "Airballs",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
