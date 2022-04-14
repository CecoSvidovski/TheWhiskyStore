using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreDbContext : DbContext
{
    public StoreDbContext(DbContextOptions options) : base(options)
    {
    }
}