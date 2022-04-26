using TheWhiskyStore.Core.Models;
using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Core.Contracts
{
    public interface IBasketService
    {
        Task<Basket?> GetBasketAsync(string userId);

        Task<Basket> CreateBasketAsync();

        Task<bool> AddItemAsync(Basket basket, int productId, int quantity);

        Task<bool> RemoveItemAsync(Basket basket, int productId, int quantity);

        BasketDto MapBasketToDto(Basket basket);
    }
}
