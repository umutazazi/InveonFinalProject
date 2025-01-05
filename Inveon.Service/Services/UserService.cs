using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.DTOs.AppUser;
using Inveon.Core.DTOs.Course;
using Inveon.Core.DTOs.Order;
using Inveon.Core.DTOs.Shared;
using Inveon.Core.Models;
using Inveon.Core.Modelss;
using Inveon.Core.Repositories;
using Inveon.Core.Services;
using Inveon.Core.UnitOfWork;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Service.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IGenericRepository<Order> _orderRepository;
        private readonly IUnitOfWork _unitOfWork;

        public UserService(UserManager<AppUser> userManager, IUnitOfWork unitOfWork, IGenericRepository<Order> orderRepository)
        {
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _orderRepository = orderRepository;


        }

        public async Task<Response<AppUserDetailsDto>> GetUserWithDetails(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
            {
                return Response<AppUserDetailsDto>.Fail("User not found", statusCode: 404);
            }

            var userWithDetails = ObjectMapper.Mapper.Map<AppUserDetailsDto>(user);
            return Response<AppUserDetailsDto>.Success(userWithDetails, 200);
        }

        public async Task<Response<AppUserDto>> CreateUserAsync(AppUserCreateDto userCreateDto)
        {
            var existingUser = await _userManager.FindByEmailAsync(userCreateDto.Email);
            if (existingUser != null)
            {
               return Response<AppUserDto>.Fail(error:"Email is already in use",400);
            }

            var user = new AppUser
          {
              UserName = userCreateDto.UserName,
              Email = userCreateDto.Email,
              PasswordHash = userCreateDto.Password
          };
         

          var result = await _userManager.CreateAsync(user, userCreateDto.Password);
            
            if(!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return Response<AppUserDto>.Fail(errors, 400);
            }
            await _unitOfWork.CommitAsync();
            return Response<AppUserDto>.Success(ObjectMapper.Mapper.Map<AppUserDto>(user), 201);

        }

        public async Task<Response<NoContent>> DeleteUserAsync(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if(user == null)
            {
                return Response<NoContent>.Fail("User not found", statusCode: 404);
            }
            var result = await _userManager.DeleteAsync(user);
            if(!result.Succeeded)
            {
                var errors = result.Errors.Select(x => x.Description).ToList();
                return Response<NoContent>.Fail(errors, 400);
            }
            await _unitOfWork.CommitAsync();
            return Response<NoContent>.Success(204);
        }

        public async Task<Response<NoContent>> UpdateUserAsync(int id, AppUserUpdateDto userUpdateDto)
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return Response<NoContent>.Fail("User not found", 404);

            var passwordCheck = await _userManager.CheckPasswordAsync(user, userUpdateDto.CurrentPassword);
            if (!passwordCheck)
                return Response<NoContent>.Fail("Current password is incorrect", 400);

            user.UserName = userUpdateDto.UserName;
            user.Email = userUpdateDto.Email;

            if (!string.IsNullOrEmpty(userUpdateDto.NewPassword))
            {
                var passwordResult = await _userManager.ChangePasswordAsync(
                    user,
                    userUpdateDto.CurrentPassword,
                    userUpdateDto.NewPassword
                );

                if (!passwordResult.Succeeded)
                {
                    var errors = passwordResult.Errors.Select(x => x.Description).ToList();
                    return Response<NoContent>.Fail(errors, 400);
                }
            }

            var updateResult = await _userManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                var errors = updateResult.Errors.Select(x => x.Description).ToList();
                return Response<NoContent>.Fail(errors,statusCode: 400);
            }

            await _unitOfWork.CommitAsync();
            return Response<NoContent>.Success(204);

        }

        public async Task<Response<IEnumerable<CourseDto>>> GetUserCourses(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return Response<IEnumerable<CourseDto>>.Fail("User not found", 404);

            // Get all orders for the user
            var orders = await _orderRepository.FindAsync(o => o.UserId == userId);
           

            // Extract unique courses from the orders
            var courses = orders
                .Select(o => o.Course)
                .Distinct();
            

            // Map the courses to DTOs
            var courseDtos = ObjectMapper.Mapper.Map<IEnumerable<CourseDto>>(courses);

            return Response<IEnumerable<CourseDto>>.Success(courseDtos, 200);




        }
    }
}
