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

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brands, string types, string ages)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();
            var ageList = new List<string>();

            if(!string.IsNullOrWhiteSpace(brands))
                brandList.AddRange(brands.ToLower().Split('\u002C').ToList());

            if (!string.IsNullOrWhiteSpace(types))
                typeList.AddRange(types.ToLower().Split('\u002C').ToList());

            if (!string.IsNullOrWhiteSpace(ages))
                ageList.AddRange(ages.ToLower().Split('\u002C').ToList());

            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));
            query = query.Where(p => ageList.Count == 0 || ageList.Contains(p.Age.ToString().ToLower()));

            return query;
        }
    }
}
