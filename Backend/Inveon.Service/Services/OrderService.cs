using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.DTOs.Order;
using Inveon.Core.DTOs.Shared;
using Inveon.Core.Models;
using Inveon.Core.Modelss;
using Inveon.Core.Repositories;
using Inveon.Core.Services;
using Inveon.Core.UnitOfWork;
using Inveon.Repository;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Service.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepository;
        private readonly IGenericRepository<Course> _courseRepository;
        private readonly IGenericRepository<AppUser> _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(
            IGenericRepository<Order> orderRepository,
            IGenericRepository<Course> courseRepository,
            IGenericRepository<AppUser> userRepository,
            IUnitOfWork unitOfWork)
        {
            _orderRepository = orderRepository;
            _courseRepository = courseRepository;
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Response<OrderDto>> CreateOrderAsync(int userId, int courseId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return Response<OrderDto>.Fail("User not found", statusCode: 404);

            var course = await _courseRepository.GetByIdAsync(courseId);
            if (course == null)
                return Response<OrderDto>.Fail("Course not found", statusCode: 404);


            var order = new Order
            {
                UserId = userId,
                CourseId = courseId,
                OrderDate = DateTime.UtcNow,
                AppUser = user,
                Course = course
                
            };

            await _orderRepository.AddAsync(order);
            
            await _unitOfWork.CommitAsync();

            
            var newDto = ObjectMapper.Mapper.Map<OrderDto>(order);
            return Response<OrderDto>.Success(ObjectMapper.Mapper.Map<OrderDto>(newDto), statusCode: 200);
        }

        public async Task<Response<IEnumerable<OrderDto>>> GetUserOrdersAsync(int userId)
        {
            var orders = await _orderRepository.FindAsync(
                x => x.UserId == userId,
                include: query => query.Include(o => o.Course)
            );
            var orderDto = ObjectMapper.Mapper.Map<IEnumerable<OrderDto>>(orders);
            return Response<IEnumerable<OrderDto>>.Success(orderDto, 200);
        }

    }
}
