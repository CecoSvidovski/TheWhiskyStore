namespace TheWhiskyStore.Core.Models;

public class BasketDto
{
    public string BuyerId { get; set; }

    public ICollection<BasketItemDto> Items { get; set; }
}
