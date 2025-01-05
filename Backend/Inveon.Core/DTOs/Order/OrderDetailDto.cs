using Inveon.Core.DTOs.AppUser;
using Inveon.Core.DTOs.Course;
using Inveon.Core.DTOs.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs.Order
{
    public record OrderDetailDto(
        int Id,
        CourseDto Course = null,
        AppUserDto? User = null,
        PaymentDto? Payment = null,
        DateTime OrderDate = default
    );

}
