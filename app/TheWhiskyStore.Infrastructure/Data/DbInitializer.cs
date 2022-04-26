using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Infrastructure.Data;

public static class DbInitializer
{
    public static void Initialize(StoreDbContext context)
    {
        if (context.Products.Any()) return;

        var products = new List<Product>
        {
            new Product
            {
                Name = "Whiskey 1",
                Price = 5000,
                PictureUrl = "/images/products/01.jpg",
                Brand = "Brand 1",
                Type = "Scotch",
                QuantityInStock = 50,
                Age = 6,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere.",
            },
            new Product
            {
                Name = "Whiskey 2",
                Price = 3800,
                PictureUrl = "/images/products/02.jpg",
                Brand = "Brand 2",
                Type = "Irish",
                QuantityInStock = 50,
                Description = "Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Maecenas porttitor congue.",
            },
            new Product
            {
                Name = "Whiskey 3",
                Price = 6900,
                PictureUrl = "/images/products/03.jpg",
                Brand = "Brand 3",
                Type = "Bourbon",
                QuantityInStock = 100,
                Age = 12,
                Description = "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem.",
            },
            new Product
            {
                Name = "Whiskey 4",
                Price = 3000,
                PictureUrl = "/images/products/04.jpg",
                Brand = "Brand 4",
                Type = "Tennessee",
                QuantityInStock = 100,
                Description = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            },
            new Product
            {
                Name = "Whiskey 5",
                Price = 42000,
                PictureUrl = "/images/products/05.jpg",
                Brand = "Brand 3",
                Type = "Single Malt",
                QuantityInStock = 100,
                Age = 69,
                Description = "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis.",
            },
            new Product
            {
                Name = "Whiskey 6",
                Price = 2400,
                PictureUrl = "/images/products/06.jpg",
                Brand = "Brand 1",
                Type = "Rye",
                QuantityInStock = 100,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar.",
            },
            new Product
            {
                Name = "Whiskey 7",
                Price = 7800,
                PictureUrl = "/images/products/07.jpg",
                Brand = "Brand 5",
                Type = "Japanese",
                QuantityInStock = 100,
                Age = 12,
                Description = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
            },
            new Product
            {
                Name = "Whiskey 8",
                Price = 4000,
                PictureUrl = "/images/products/08.jpg",
                Brand = "Brand 1",
                Type = "Tennessee",
                QuantityInStock = 100,
                Age = 3,
                Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
            },
            new Product
            {
                Name = "Whiskey 9",
                Price = 8900,
                PictureUrl = "/images/products/09.jpg",
                Brand = "Brand 3",
                Type = "Bourbon",
                QuantityInStock = 100,
                Age = 18,
                Description = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.",
            },
            new Product
            {
                Name = "Whiskey 10",
                Price = 3600,
                PictureUrl = "/images/products/10.jpg",
                Brand = "Brand 2",
                Type = "Irish",
                QuantityInStock = 100,
                Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
            },
            new Product
            {
                Name = "Whiskey 11",
                Price = 3400,
                PictureUrl = "/images/products/11.jpg",
                Brand = "Brand 4",
                Type = "Irish",
                QuantityInStock = 100,
                Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
            },
            new Product
            {
                Name = "Whiskey 12",
                Price = 2900,
                PictureUrl = "/images/products/12.jpg",
                Brand = "Brand 2",
                Type = "Scotch",
                QuantityInStock = 100,
                Description = "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque.",
            },
            new Product
            {
                Name = "Whiskey 13",
                Price = 5900,
                PictureUrl = "/images/products/13.jpg",
                Brand = "Brand 3",
                Type = "Tennessee",
                QuantityInStock = 100,
                Age = 8,
                Description = "Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.",
            },
            new Product
            {
                Name = "Whiskey 14",
                Price = 12000,
                PictureUrl = "/images/products/14.jpg",
                Brand = "Brand 5",
                Type = "Blended",
                QuantityInStock = 100,
                Age = 18,
                Description = "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
            },
            new Product
            {
                Name = "Whiskey 15",
                Price = 6800,
                PictureUrl = "/images/products/15.jpg",
                Brand = "Brand 4",
                Type = "Irish",
                QuantityInStock = 100,
                Age = 12,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed.",
            },
            new Product
            {
                Name = "Whiskey 16",
                Price = 4700,
                PictureUrl = "/images/products/16.jpg",
                Brand = "Brand 2",
                Type = "Irish",
                QuantityInStock = 100,
                Age = 6,
                Description = "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci.",
            },
            new Product
            {
                Name = "Whiskey 17",
                Price = 6500,
                PictureUrl = "/images/products/17.jpg",
                Brand = "Brand 1",
                Type = "Blended",
                QuantityInStock = 100,
                Age = 8,
                Description = "Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
            },
            new Product
            {
                Name = "Whiskey 18",
                Price = 8900,
                PictureUrl = "/images/products/18.jpg",
                Brand = "Brand 3",
                Type = "Japanese",
                QuantityInStock = 100,
                Age = 12,
                Description = "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.",
            },
        };

        foreach (var product in products)
        {
            context.Products.Add(product);
        }

        context.SaveChanges();
    }
}

