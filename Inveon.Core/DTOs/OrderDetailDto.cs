﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs
{
    public record OrderDetailDto(
        int Id,
        CourseDto Course,
        AppUserDto User,
        PaymentDto Payment,
        DateTime OrderDate
    );

}
