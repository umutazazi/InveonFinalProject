using Inveon.Core.DTOs.Shared;
using Inveon.Core.DTOs;
using Inveon.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.Services
{
    public interface IUserService 
    {
        Task<Response<AppUserDetailsDto>> GetUserWithDetails(int userId);
        Task<Response<AppUserDto>> CreateUserAsync(AppUserCreateDto userCreateDto);
        Task<Response<NoContent>> DeleteUserAsync(int id);
        Task<Response<NoContent>> UpdateUserAsync(int id, AppUserUpdateDto userUpdateDto);
        Task<Response<IEnumerable<CourseDto>>> GetUserCourses(int userId);
    }
}
