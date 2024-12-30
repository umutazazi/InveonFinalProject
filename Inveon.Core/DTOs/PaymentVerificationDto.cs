using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs
{
    public record PaymentVerificationDto(
        int PaymentId,
        bool IsSuccessful,
        string Message
    );
}
