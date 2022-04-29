using System.Linq.Expressions;
using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Core.Extensions
{
    public static class ProductExtension
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return query;

            query = orderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                "name" => query.OrderBy(p => p.Name),
                "nameDesc" => query.OrderByDescending(p => p.Name),
                "type" => query.OrderBy(p => p.Type),
                "typeDesc" => query.OrderByDescending(p => p.Type),
                "brand" => query.OrderBy(p => p.Brand),
                "brandDesc" => query.OrderByDescending(p => p.Brand),
                "age" => query.OrderBy(p => p.Age),
                "ageDesc" => query.OrderByDescending(p => p.Age),
                _ => query,
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string search)
        {
            if (string.IsNullOrWhiteSpace(search)) return query;

            var lowerCaseSearchTerm = search.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}
