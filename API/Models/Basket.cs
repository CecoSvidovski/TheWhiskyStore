using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Basket
{
    public int Id { get; set; }

    [Required]
    public string UserId { get; set; }

    public ICollection<BasketItem> Items { get; set; } = new HashSet<BasketItem>();
}
