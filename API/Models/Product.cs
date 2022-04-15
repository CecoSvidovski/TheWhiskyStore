using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    public string? Name { get; set; }

    [Required]
    public string? Description { get; set; }

    // I chose long because that's what Stripe payment processor 
    // uses for the price information (normally should be decimal)
    [Required]
    public long Price { get; set; }

    [Required]
    public string? PictureUrl { get; set; }

    [Required]
    public string? Type { get; set; }

    [Required]
    public string? Brand { get; set; }

    [Required]
    public int QuantityInStock { get; set; }
}
