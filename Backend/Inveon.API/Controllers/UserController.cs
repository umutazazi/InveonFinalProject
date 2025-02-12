﻿using Inveon.Core.DTOs.AppUser;
using Inveon.Core.Models;
using Inveon.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : CustomBaseController
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
            return ActionResultInstance(response);
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateUser(AppUserCreateDto userCreateDto)
        {
            var response = await _userService.CreateUserAsync(userCreateDto);
            return ActionResultInstance(response);
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var response = await _userService.DeleteUserAsync(id);
            return ActionResultInstance(response);
        }
       
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, AppUserUpdateDto userUpdateDto)
        {
            var response = await _userService.UpdateUserAsync(id, userUpdateDto);
            return ActionResultInstance(response);
        }
        [HttpGet("{userId}/courses")]
        public async Task<IActionResult> GetUserCourses(int userId)
        {
            var response = await _userService.GetUserCourses(userId);
            return ActionResultInstance(response);
        }

    }
}
