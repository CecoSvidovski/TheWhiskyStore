using System.ComponentModel.DataAnnotations;

namespace TheWhiskyStore.Infrastructure.Data.Models;

public class Basket
{
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; }

    public ICollection<BasketItem> Items { get; set; } = new List<BasketItem>();
}
