using Microsoft.EntityFrameworkCore;

using TheWhiskyStore.Infrastructure.Data;
using TheWhiskyStore.Infrastructure.Data.Repositories;
using TheWhiskyStore.Core.Services;
using TheWhiskyStore.Core.Contracts;

namespace Microsoft.Extensions.DependencyInjection;

public static class ApiServiceCollectionExtension
{
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<IStoreDbRepository, StoreDbRepository>();
        services.AddScoped<IProductService, ProductService>();

        return services;
    }

    public static IServiceCollection AddDbContext(this IServiceCollection services, IConfiguration config)
    {
        var connectionString = config.GetConnectionString("DefaultConnection");
        services.AddDbContext<StoreDbContext>(options =>
            options.UseSqlServer(connectionString));

        return services;
    }
}

