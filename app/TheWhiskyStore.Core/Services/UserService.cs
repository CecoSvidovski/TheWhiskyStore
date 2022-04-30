using Microsoft.AspNetCore.Identity;
using TheWhiskyStore.Core.Contracts;
using TheWhiskyStore.Core.Models;
using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Core.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;

    public UserService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<(User user, bool success)> LoginAsync(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user == null) user = await _userManager.FindByNameAsync(loginDto.Email);
        if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
        {
            return (user, false);
        }
        return (user, true);
    }

    public async Task<IdentityResult> RegisterAsync(RegisterDto registerDto)
    {
        var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "Member");
        }

        return result;
    }

    public async Task<User> GetUserAsync(string username)
    {
        return await _userManager.FindByNameAsync(username);
    }
}
