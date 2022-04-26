using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Core.Contracts;

public interface IProductService
{
    Task<Product> GetOne(int id);

    Task<List<Product>> GetAll();

}
