using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TheWhiskyStore.Core.Contracts;
using TheWhiskyStore.Core.Models;
using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;

    public UserController(IUserService userService, ITokenService tokenService)
    {
        _userService = userService;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        (User user, bool success) = await _userService.LoginAsync(loginDto);

        if (!success) return Unauthorized();

        return new UserDto
        {
            Username = user.UserName,
            Token = await _tokenService.GenerateToken(user)
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var result = await _userService.RegisterAsync(registerDto);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        return StatusCode(201);
    }

    [Authorize]
    [HttpGet("user")]
    public async Task<ActionResult<UserDto>> GetUser()
    {
        var user = await _userService.GetUserAsync(User.Identity.Name);

        return new UserDto
        {
            Username = user.UserName,
            Token = await _tokenService.GenerateToken(user),
        };
    }
}
