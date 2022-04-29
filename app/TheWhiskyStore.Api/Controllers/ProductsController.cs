using Microsoft.AspNetCore.Mvc;

using TheWhiskyStore.Infrastructure.Data.Models;
using TheWhiskyStore.Core.Contracts;
using TheWhiskyStore.Core.RequestHelpers;
using System.Text.Json;
using TheWhiskyStore.Api.Extensions;

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
    public async Task<ActionResult<ICollection<Product>>> GetAll([FromQuery] ProductParams productParams)
    {
        var products = await _service.GetAllAsync(productParams);

        Response.AddPaginationHeader(products.MetaData);

        return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetOne(int id)
    {
        var product = await _service.GetOneAsync(id);

        if (product == null) return NotFound();

        return product;
    }

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters()
    {
        var filters = await _service.GetFiltersAsync();

        return Ok(filters);
    }
}
