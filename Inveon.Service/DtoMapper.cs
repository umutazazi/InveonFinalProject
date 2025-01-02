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

        }
    }
}
