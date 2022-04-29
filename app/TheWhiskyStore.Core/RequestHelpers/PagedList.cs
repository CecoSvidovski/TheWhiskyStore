using Microsoft.EntityFrameworkCore;

namespace TheWhiskyStore.Core.RequestHelpers;

public class PagedList<T> : List<T>
{
    public PagedList(List<T> items, int count, int pageIndex, int pageSize)
    {
        MetaData = new MetaData
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageIndex,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize),
        };

        AddRange(items);
    }

    public MetaData MetaData { get; set; }

    public static async Task<PagedList<T>> ToPagedListAsync
        (IQueryable<T> query, int pageIndex, int pageSize)
    {
        if (pageIndex < 1) throw new ArgumentException("PageIndex cannot be less than 1");
        if (pageSize < 1) throw new ArgumentException("PageSize cannot be less than 1");

        var count = await query.CountAsync();
        var items = await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PagedList<T>(items, count, pageIndex, pageSize);
    }
}
