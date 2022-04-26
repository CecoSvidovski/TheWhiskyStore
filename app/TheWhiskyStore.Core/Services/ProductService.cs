using TheWhiskyStore.Core.Contracts;
using TheWhiskyStore.Infrastructure.Data.Models;
using TheWhiskyStore.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace TheWhiskyStore.Core.Services;

public class ProductService : IProductService
{
    private readonly IStoreDbRepository _repository;

    public ProductService(IStoreDbRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Product>> GetAll()
    {
        return await _repository.All<Product>().ToListAsync();
    }

    public async Task<Product> GetOne(int id)
    {
        return await _repository.GetByIdAsync<Product>(id);
    }
}
