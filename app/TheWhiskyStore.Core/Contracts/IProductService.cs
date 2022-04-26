﻿using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Core.Contracts;

public interface IProductService
{
    Task<Product> GetOneAsync(int id);

    Task<List<Product>> GetAllAsync();

}
