﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs.Login
{
    public record LoginDto(
        string Email,
        string Password
    );

}
