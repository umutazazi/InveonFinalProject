using Inveon.Core.DTOs.Order;
using Inveon.Core.Modelss;
using Inveon.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : CustomBaseController
    {
        private readonly IServiceGeneric<Order, OrderDto> _orderService;
        private readonly IOrderService _orderCreateService;

        public OrderController(IServiceGeneric<Order, OrderDto> orderService, IOrderService orderCreateService)
        {
            _orderService = orderService;
            _orderCreateService = orderCreateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _orderService.GetAllAsync();
            return ActionResultInstance(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _orderService.GetByIdAsync(id);
            return ActionResultInstance(response);
        }

        [HttpPost]
        public async Task<IActionResult> Add(OrderDto orderDto)
        {
            var response = await _orderService.AddAsync(orderDto);
            return ActionResultInstance(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, OrderDto orderDto)
        {
            var response = await _orderService.UpdateAsync(id, orderDto);
            return ActionResultInstance(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _orderService.DeleteAsync(id);
            return ActionResultInstance(response);
        }
        [HttpGet("{userId}/purchases")]
        public async Task<IActionResult> GetUserOrders(int userId)
        {
            var response = await _orderCreateService.GetUserOrdersAsync(userId);
            return ActionResultInstance(response);
        }
        [HttpPost("{userId}/{courseId}/purchase")]
        public async Task<IActionResult> PurchaseCourse(int userId,int courseId)
        {
            var response = await _orderCreateService.CreateOrderAsync(userId, courseId);
            return ActionResultInstance(response);
        }






    }
}
