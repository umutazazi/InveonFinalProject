using Inveon.Core.DTOs.Login;
using Inveon.Core.DTOs.Shared;
using Inveon.Core.DTOs.TokenDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.Services
{
    public interface IAuthenticationService
    {
        Task<Response<TokenDto>> CreateTokenAsync(LoginDto loginDto);

        Task<Response<TokenDto>> CreateTokenByRefreshToken(string refreshToken);

        Task<Response<NoContent>> RevokeRefreshToken(string refreshToken);

     
    }
}
