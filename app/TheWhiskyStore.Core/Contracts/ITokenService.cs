using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Core.Contracts;

public interface ITokenService
{
    Task<string> GenerateToken(User user);
}
