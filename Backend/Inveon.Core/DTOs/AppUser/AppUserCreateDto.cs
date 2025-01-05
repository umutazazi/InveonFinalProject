﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs.AppUser
{
    public record AppUserCreateDto(
        string UserName,
        string Email,
        string Password
        );

}
