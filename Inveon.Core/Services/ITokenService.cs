using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Configurations;

using Inveon.Core.DTOs.TokenDtos;
using Inveon.Core.Models;

namespace Inveon.Core.Services
{
    public interface ITokenService
    {
        TokenDto CreateToken(AppUser appUser);
      
    }
}
