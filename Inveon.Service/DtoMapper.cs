using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Models;
using Inveon.Core.Modelss;
using Inveon.Core.DTOs.AppUser;
using Inveon.Core.DTOs.Course;
using Inveon.Core.DTOs.Payment;
using Inveon.Core.DTOs.Order;

namespace Inveon.Service
{
        public class DtoMapper : Profile
        {
            public DtoMapper() {
                CreateMap<AppUserDto, AppUser>().ReverseMap();
                CreateMap<CourseDto,Course>().ReverseMap();
                CreateMap<OrderDto, Order>().ReverseMap();
                CreateMap<PaymentDto, Payment>().ReverseMap();
                CreateMap<AppUser, AppUserDetailsDto>();

                CreateMap<Course, CourseDto>()
                    .ForCtorParam("Id", opt => opt.MapFrom(src => src.Id))
                    .ForCtorParam("Name", opt => opt.MapFrom(src => src.Name))
                    .ForCtorParam("Description", opt => opt.MapFrom(src => src.Description))
                    .ForCtorParam("Price", opt => opt.MapFrom(src => src.Price))
                    .ForCtorParam("Category", opt => opt.MapFrom(src => src.Category))
                    .ForCtorParam("ImageUrl", opt => opt.MapFrom(src => src.ImageUrl))
                    .ForCtorParam("InstructorId", opt => opt.MapFrom(src => src.Instructor != null ? src.Instructor.Id : 0))
                    .ForCtorParam("InstructorName", opt => opt.MapFrom(src => src.Instructor != null ? src.Instructor.UserName : string.Empty));

        }
        }
}
