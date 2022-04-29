using TheWhiskyStore.Core.RequestHelpers;
using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Core.Contracts;

public interface IProductService
{
    Task<Product> GetOneAsync(int id);

    Task<PagedList<Product>> GetAllAsync(ProductParams productParams);

    Task<object> GetFiltersAsync();
}
