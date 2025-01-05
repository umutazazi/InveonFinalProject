using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs.Payment
{
    public record PaymentCreateDto(
        int OrderId,
        int UserId,
        decimal Amount,
        string PaymentMethod
    );
}
