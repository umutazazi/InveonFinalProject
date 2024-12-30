﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs
{
    public record PaymentCreateDto(
        int OrderId,
        decimal Amount,
        string PaymentMethod
    );
}
