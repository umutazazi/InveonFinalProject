using Inveon.Core.DTOs.Course;
using Inveon.Core.Models;
using Inveon.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.API.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : CustomBaseController
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
            return ActionResultInstance(response);


        }
       
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _courseService.GetByIdAsync(id);


            return ActionResultInstance(response);


        }
        [Authorize(Roles = "instructor,admin")]
        [HttpPost]
        public async Task<IActionResult> Add(CourseDto courseDto)
        {
            var response = await _courseService.AddAsync(courseDto);
            return ActionResultInstance(response);
        }
        [Authorize(Roles = "instructor,admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CourseDto courseDto)
        {
            var response = await _courseService.UpdateAsync(id, courseDto);
            return ActionResultInstance(response);
        }
        [Authorize(Roles = "instructor,admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _courseService.DeleteAsync(id);
            return ActionResultInstance(response);
        }
    }
}
