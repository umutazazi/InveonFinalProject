﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs.Course
{
    public record CourseDto(
        int Id,
        string Name,
        string Description,
        decimal Price,
        string Category,
        string ImageUrl,
        int InstructorId,
        string InstructorName

  
        );


}
