using Microsoft.EntityFrameworkCore;

using API.Models;

namespace API.Data;

public class StoreDbContext : DbContext
{
    public StoreDbContext()
    {
    }

    public StoreDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
}
