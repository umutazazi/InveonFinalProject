using Inveon.Core.DTOs;
using Inveon.Core.Models;
using Inveon.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserWithDetails(int id)
        {
            var response = await _userService.GetUserWithDetails(id);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> CreateUser(AppUserCreateDto userCreateDto)
        {
            var response = await _userService.CreateUserAsync(userCreateDto);
            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var response = await _userService.DeleteUserAsync(id);
            return Ok(response);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, AppUserUpdateDto userUpdateDto)
        {
            var response = await _userService.UpdateUserAsync(id, userUpdateDto);
            return Ok(response);
        }
        [HttpGet("{userId}/courses")]
        public async Task<IActionResult> GetUserCourses(int userId)
        {
            var response = await _userService.GetUserCourses(userId);
            return Ok(response);
        }

    }
}
