using Inveon.Core.DTOs.Course;
using Inveon.Core.Models;
using Inveon.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly IServiceGeneric<Course, CourseDto> _courseService;

        public CourseController(IServiceGeneric<Course, CourseDto> courseService)
        {
            _courseService = courseService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _courseService.GetAllAsync();
           return Ok(response);


        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _courseService.GetByIdAsync(id);


            return Ok(response);


        }
        [HttpPost]
        public async Task<IActionResult> Add(CourseDto courseDto)
        {
            var response = await _courseService.AddAsync(courseDto);
            return Ok(response);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CourseDto courseDto)
        {
            var response = await _courseService.UpdateAsync(id, courseDto);
            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _courseService.DeleteAsync(id);
            return Ok(response);
        }
    }
}
