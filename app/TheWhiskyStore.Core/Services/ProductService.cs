using TheWhiskyStore.Core.Contracts;
using TheWhiskyStore.Core.Extensions;
using TheWhiskyStore.Infrastructure.Data.Models;
using TheWhiskyStore.Infrastructure.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TheWhiskyStore.Core.RequestHelpers;

namespace TheWhiskyStore.Core.Services;

public class ProductService : IProductService
{
    private readonly IStoreDbRepository _repository;

    public ProductService(IStoreDbRepository repository)
    {
        _repository = repository;
    }

    public async Task<PagedList<Product>> GetAllAsync(ProductParams productParams)
    {
        var orderBy = productParams.OrderBy;
        var search = productParams.Search;
        var brands = productParams.Brands;
        var types = productParams.Types;
        var ages = productParams.Ages;
        var pageIndex = productParams.PageIndex;
        var pageSize = productParams.PageSize;

        var query = _repository.GetAll<Product>()
            .Sort(orderBy)
            .Search(search)
            .Filter(brands, types, ages);

        return await PagedList<Product>.ToPagedListAsync(query, pageIndex, pageSize);
    }

    public async Task<Product> GetOneAsync(int id)
    {
        return await _repository.GetByIdAsync<Product>(id);
    }

    public async Task<object> GetFiltersAsync()
    {
        var brands = await _repository.GetAll<Product>().Select(p => p.Brand).Distinct().ToListAsync();
        var types = await _repository.GetAll<Product>().Select(p => p.Type).Distinct().ToListAsync();
        var ages = await _repository.GetAll<Product>().Select(p => p.Age).Distinct().ToListAsync();

        return new { brands, types, ages };
    }
}
