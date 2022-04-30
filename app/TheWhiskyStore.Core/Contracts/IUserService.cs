using Microsoft.AspNetCore.Identity;
using TheWhiskyStore.Core.Models;
using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Core.Contracts;

public interface IUserService
{
    Task<(User user, bool success)> LoginAsync(LoginDto loginDto);

    Task<IdentityResult> RegisterAsync(RegisterDto registerDto);

    Task<User> GetUserAsync(string username);
}
