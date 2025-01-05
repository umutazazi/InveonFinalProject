using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs.Payment
{
    public record PaymentDto(
        int Id,
        int UserId,
        int OrderId,
        decimal Amount,
        string PaymentMethod,
        DateTime PaymentDate
    );
}
