using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs
{
    public record PaymentDto(
        int Id,
        int OrderId,
        decimal Amount,
        string PaymentMethod,
        DateTime PaymentDate
    );
}
