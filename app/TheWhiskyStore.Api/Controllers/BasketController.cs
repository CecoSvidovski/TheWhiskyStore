using Microsoft.AspNetCore.Mvc;

using TheWhiskyStore.Core.Constants;
using TheWhiskyStore.Core.Contracts;
using TheWhiskyStore.Core.Models;
using TheWhiskyStore.Infrastructure.Data.Models;

namespace TheWhiskyStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BasketController : ControllerBase
{
    private readonly IBasketService _service;

    public BasketController(IBasketService service)
    {
        _service = service;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NotFound();

        return _service.MapBasketToDto(basket);
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        if (basket == null) basket = await CreateBasket();

        bool result = await _service.AddItemAsync(basket, productId, quantity);

        if (result) return CreatedAtRoute("GetBasket", _service.MapBasketToDto(basket));

        return BadRequest(new ProblemDetails { Title = "Could not save item to basket" });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItem(int productId, int quantity)
    {
        var basket = await RetrieveBasket();
        if (basket == null) return NotFound();

        var result = await _service.RemoveItemAsync(basket, productId, quantity);

        if (result) return Ok();

        return BadRequest(new ProblemDetails { Title = "Could not remove item from basket" });
    }

    private async Task<Basket> CreateBasket()
    {
        var basket = await _service.CreateBasketAsync();

        var cookieOptions = new CookieOptions 
        { 
            IsEssential = true, 
            Expires = DateTime.Now.AddDays(30) 
        };
        Response.Cookies.Append(CookieConstants.BuyerId, basket.BuyerId, cookieOptions);

        return basket;
    }

    private async Task<Basket> RetrieveBasket() => 
        await _service.GetBasketAsync(Request.Cookies[CookieConstants.BuyerId]);
}
