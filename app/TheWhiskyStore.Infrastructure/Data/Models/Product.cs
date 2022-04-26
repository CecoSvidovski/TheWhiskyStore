using System.ComponentModel.DataAnnotations;

namespace TheWhiskyStore.Infrastructure.Data.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    [MaxLength(80)]
    public string Name { get; set; }

    // I chose long because that's what Stripe payment processor 
    // uses for the price information (normally should be decimal)
    [Required]
    public long Price { get; set; }

    [Required]
    public string PictureUrl { get; set; }

    [MaxLength(60)]
    public string Type { get; set; }

    [Required]
    [MaxLength(60)]
    public string Brand { get; set; }

    [Required]
    public int QuantityInStock { get; set; }

    public int? Age { get; set; }
    
    [Required]
    public string Description { get; set; }
}
