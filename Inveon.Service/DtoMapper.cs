using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.DTOs;
using Inveon.Core.Models;
using Inveon.Core.Modelss;

namespace Inveon.Service
{
    public class DtoMapper : Profile
    {
        public DtoMapper() {
            CreateMap<AppUserDto, AppUser>().ReverseMap();
            CreateMap<CourseDto,Course>().ReverseMap();
            CreateMap<OrderDto, Order>().ReverseMap();
            CreateMap<PaymentDto, Payment>().ReverseMap();

        }
    }
}
