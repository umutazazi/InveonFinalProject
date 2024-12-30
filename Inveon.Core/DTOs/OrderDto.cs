using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs
{
    public record OrderDto(
        int Id,
        int UserId,
        int CourseId,
        string CourseName,
        decimal CoursePrice,
        DateTime OrderDate,
        PaymentDto Payment
    );
}
