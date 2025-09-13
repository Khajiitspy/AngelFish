using Core.Interfaces;
using Core.Models.Category;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngelAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController(ICategoriesService categoriesService) : Controller
{
    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        var model = await categoriesService.GetAllAsync();

        return Ok(model);
    }

    [HttpPost("create")]
    //[Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Create([FromForm] CategoryCreateModel model)
    {
        var existingCategory = await categoriesService.GetBySlugAsync(model.Slug);

        if (existingCategory != null)
        {
            return BadRequest(new
            {
                status = 400,
                isValid = false,
                errors = new[] { "Slug already exists on another category!" }
            });
        }
        
        var result = await categoriesService.CreateAsync(model);

        return Ok(result);
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromForm] CategoryEditModel model)
    {
        var existingCategory = await categoriesService.GetBySlugAsync(model.Slug);

        if (existingCategory != null && existingCategory.Id != model.Id)
        {
            return BadRequest(new
            {
                status = 400,
                isValid = false,
                errors = new[] { "Slug already exists on another category!" }
            });
        }

        var result = await categoriesService.UpdateAsync(model);
        return Ok(result);
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var result = await categoriesService.GetBySlugAsync(slug);

        return Ok(result);
    }

    [HttpDelete("delete")]
    //[Authorize(Roles = Roles.Admin)]
    public async Task<IActionResult> Delete([FromBody] CategoryDeleteModel model)
    {
        await categoriesService.DeleteAsync(model);
        return Ok($"Category with id: {model.Id} deleted");
    }
}
