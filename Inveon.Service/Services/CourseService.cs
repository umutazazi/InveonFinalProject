using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.DTOs.Course;
using Inveon.Core.DTOs.Order;
using Inveon.Core.DTOs.Shared;
using Inveon.Core.Models;
using Inveon.Core.Repositories;
using Inveon.Core.Services;
using Inveon.Core.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Service.Services
{
    public class CourseService: ICourseService
    {
        private readonly IGenericRepository<Course> _courseRepository;
        private readonly IUnitOfWork _unitOfWork;

        public CourseService(IGenericRepository<Course> courseRepository, IUnitOfWork unitOfWork)
        {
            _courseRepository = courseRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<IEnumerable<CourseDto>>> GetByInstructor(int instructorId)
        {
            var courses = await _courseRepository.FindAsync(c => c.InstructorId == instructorId, 
                include: query => query.Include(c => c.Instructor));

            var courseDto = ObjectMapper.Mapper.Map<IEnumerable<CourseDto>>(courses);
            return Response<IEnumerable<CourseDto>>.Success(courseDto, 200);
        }







    }
}
