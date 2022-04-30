using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Infrastructure.Data;

public class StoreDbContext : IdentityDbContext<User>
{
    public StoreDbContext(DbContextOptions<StoreDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public DbSet<BasketItem> BasketItems { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
            );

        base.OnModelCreating(builder);
    }
}
