using TheWhiskyStore.Infrastructure.Data.Common;

namespace TheWhiskyStore.Infrastructure.Data.Repositories;

public class StoreDbRepository : Repository, IStoreDbRepository
{
    public StoreDbRepository(StoreDbContext context)
    {
        Context = context;
    }
}