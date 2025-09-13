using AutoMapper;
using Core.Interfaces;
using Core.Models.Account;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AtbWebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(IJwtTokenService jwtTokenService,
    IMapper mapper, 
    UserManager<UserEntity> userManager,
    IImageService imageService) : ControllerBase
{

    [HttpPost]
    public async Task<IActionResult> Login([FromForm] LoginModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);
        if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
        {
            var token = await jwtTokenService.CreateTokenAsync(user);
            return Ok(new { Token = token });
        }
        return Unauthorized("Invalid email or password");
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromForm] RegisterModel model)
    {
        var user = mapper.Map<UserEntity>(model);

        user.Image = await imageService.SaveImageAsync(model.ImageFile!);

        var result = await userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            var token = await jwtTokenService.CreateTokenAsync(user);
            return Ok(new
            {
                status = 200,
                isValid = true,
                message = "Registration successful",
                userToken = token
            });
        }
        else
        {
            return BadRequest(new
            {
                status = 400,
                isValid = false,
                errors = "Registration failed"
            });
        }

    }
}
