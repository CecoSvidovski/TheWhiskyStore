using Microsoft.EntityFrameworkCore;

using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Infrastructure.Data;

public class StoreDbContext : DbContext
{
    public StoreDbContext(DbContextOptions<StoreDbContext> options) 
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Basket> Baskets { get; set; }
    public DbSet<BasketItem> BasketItems { get; set; }
}
