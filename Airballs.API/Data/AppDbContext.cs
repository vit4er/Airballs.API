using Airballs.API.Models;

using Microsoft.EntityFrameworkCore;

namespace Airballs.API.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Color>().Property("Code").ValueGeneratedNever();
		}
		public DbSet<Color> Colors { get; set; }
		public DbSet<Airball> Airballs { get; set; }
	}
}
