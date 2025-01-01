using Inveon.Core.DTOs;
using Inveon.Core.Modelss;
using Inveon.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IServiceGeneric<Order,OrderDto> _orderService;

        public OrderController(IServiceGeneric<Order, OrderDto> orderService)
        {
            _orderService = orderService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _orderService.GetAllAsync();
            return Ok(response);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _orderService.GetByIdAsync(id);
            return Ok(response);
        }
        [HttpPost]
        public async Task<IActionResult> Add(OrderDto orderDto)
        {
            var response = await _orderService.AddAsync(orderDto);
            return Ok(response);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, OrderDto orderDto)
        {
            var response = await _orderService.UpdateAsync(id, orderDto);
            return Ok(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _orderService.DeleteAsync(id);
            return Ok(response);
        }




    }
}
