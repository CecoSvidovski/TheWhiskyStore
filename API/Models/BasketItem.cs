using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class BasketItem
    {
        public int Id { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public int ProductId { get; set; }

        public Product Product { get; set; }

        [Required]
        public int BasketId { get; set; }
        
        public Basket Basket { get; set; }
    }
}