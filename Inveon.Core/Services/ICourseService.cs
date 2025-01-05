using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.DTOs.Course;
using Inveon.Core.DTOs.Shared;

namespace Inveon.Core.Services
{
    public interface ICourseService
    {
        Task<Response<IEnumerable<CourseDto>>> GetByInstructor(int instructorId);
    }
}
