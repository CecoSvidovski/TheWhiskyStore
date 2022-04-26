using Microsoft.AspNetCore.Mvc;

using TheWhiskyStore.Infrastructure.Data.Models;
using TheWhiskyStore.Core.Contracts;

namespace TheWhiskyStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<ICollection<Product>>> GetAll() => await _service.GetAll();

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetOne(int id)
    {
        var product = await _service.GetOne(id);

        if (product == null) return NotFound();

        return product;
    }
}
