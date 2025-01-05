﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs.Course
{
    public record CourseUpdateDto(
        string Name,
        string Description,
        decimal Price,
        string Category
    );
}
