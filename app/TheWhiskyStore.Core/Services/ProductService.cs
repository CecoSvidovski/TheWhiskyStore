using TheWhiskyStore.Core.Contracts;
using TheWhiskyStore.Core.Extensions;
using TheWhiskyStore.Infrastructure.Data.Models;
using TheWhiskyStore.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace TheWhiskyStore.Core.Services;

public class ProductService : IProductService
{
    private readonly IStoreDbRepository _repository;

    public ProductService(IStoreDbRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<Product>> GetAllAsync(
        string orderBy, 
        string search, 
        string brands, 
        string types, 
        string ages)
    {
        return await _repository.GetAll<Product>()
            .Sort(orderBy)
            .Search(search)
            .Filter(brands, types, ages)
            .ToListAsync();
    }

    public async Task<Product> GetOneAsync(int id)
    {
        return await _repository.GetByIdAsync<Product>(id);
    }
}
