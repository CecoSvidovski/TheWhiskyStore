namespace API.Models;

public class Product
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    // I chose long because that's what Stripe payment processor 
    // uses for the price information (normally should be decimal)
    public long Price { get; set; }

    public string? PictureUrl { get; set; }

    public string? Type { get; set; }

    public string? Brand { get; set; }

    public int QuantityInStock { get; set; }
}
