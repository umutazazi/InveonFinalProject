using Inveon.Core.DTOs.Payment;
using Inveon.Core.Models;
using Inveon.Core.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Inveon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : CustomBaseController
    {
        private readonly IServiceGeneric<Payment, PaymentDto> _paymentService;

        public PaymentController(IServiceGeneric<Payment, PaymentDto> paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var response = await _paymentService.GetAllAsync();
            return ActionResultInstance(response);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var response = await _paymentService.GetByIdAsync(id);
            return ActionResultInstance(response);
        }
        [HttpPost]
        public async Task<IActionResult> Add(PaymentDto paymentDto)
        {
            var response = await _paymentService.AddAsync(paymentDto);
            return ActionResultInstance(response);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, PaymentDto paymentDto)
        {
            var response = await _paymentService.UpdateAsync(id, paymentDto);
            return ActionResultInstance(response);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _paymentService.DeleteAsync(id);
            return ActionResultInstance(response);
        }


    }
}
