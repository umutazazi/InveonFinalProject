using Inveon.Core.DTOs.Course;
using Inveon.Core.DTOs.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs.AppUser
{
    public record AppUserDetailsDto(
        int Id,
        string UserName,
        string Email,
        string PhoneNumber,
        ICollection<OrderDto> Orders,
        ICollection<CourseDto> Courses);
}
