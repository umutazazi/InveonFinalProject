using Inveon.Core.DTOs;
using Inveon.Core.Models;
using Inveon.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IServiceGeneric<Course, CourseDto> _courseService;

        public ProductController(IServiceGeneric<Course, CourseDto> courseService)
        {
            _courseService = courseService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _courseService.GetAllAsync();
           return Ok(response);


        }
    }
}
