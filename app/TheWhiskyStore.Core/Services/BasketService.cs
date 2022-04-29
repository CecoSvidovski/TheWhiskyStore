using Microsoft.EntityFrameworkCore;
using TheWhiskyStore.Core.Contracts;
using TheWhiskyStore.Core.Models;
using TheWhiskyStore.Infrastructure.Data.Models;
using TheWhiskyStore.Infrastructure.Data.Repositories;

namespace TheWhiskyStore.Core.Services
{
    public class BasketService : IBasketService
    {
        private readonly IStoreDbRepository _repository;

        public BasketService(IStoreDbRepository repository)
        {
            _repository = repository;
        }

        public async Task<Basket> CreateBasketAsync()
        {
            var buyerId = Guid.NewGuid().ToString();
            var basket = new Basket { BuyerId = buyerId };

            await _repository.AddAsync(basket);

            return basket;
        }

        public async Task<Basket> GetBasketAsync(string buyerId)
        {
            var basket = await _repository.GetAll<Basket>()
                .Include(x => x.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);

            return basket;
        }

        public async Task<bool> AddItemAsync(Basket basket, int productId, int quantity)
        {
            if (quantity <= 0) return false;
            var product = await _repository.GetByIdAsync<Product>(productId);
            if (product == null) return false;

            if (basket.Items.All(item => item.ProductId != product.Id))
            {
                basket.Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingItem = basket.Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;

            return await _repository.SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveItemAsync(Basket basket, int productId, int quantity)
        {
            if (quantity <= 0) return false;
            var item = basket.Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return false;

            if (item.Quantity > quantity) item.Quantity -= quantity;
            else basket.Items.Remove(item);

            return await _repository.SaveChangesAsync() > 0;
        }

        public BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(x => new BasketItemDto
                {
                    ProductId = x.ProductId,
                    Name = x.Product.Name,
                    Price = x.Product.Price,
                    PictureUrl = x.Product.PictureUrl,
                    Type = x.Product.Type,
                    Brand = x.Product.Brand,
                    Quantity = x.Quantity,
                }).ToList(),
            };
        }
    }
}
