using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.DTOs.Order;
using Inveon.Core.DTOs.Shared;
using Inveon.Core.Modelss;

namespace Inveon.Core.Services
{
    public interface IOrderService
    {
        Task<Response<OrderDto>> CreateOrderAsync(int userId, int courseId);
        Task<Response<IEnumerable<OrderDto>>> GetUserOrdersAsync(int userId);


    }
}
