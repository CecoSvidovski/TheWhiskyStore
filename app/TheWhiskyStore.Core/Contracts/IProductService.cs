using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Core.Contracts;

public interface IProductService
{
    Task<Product> GetOneAsync(int id);

    Task<List<Product>> GetAllAsync(
        string orderBy,
        string search,
        string brands,
        string types,
        string ages);
}
