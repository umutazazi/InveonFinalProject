using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.DTOs.Login;
using Inveon.Core.DTOs.Shared;
using Inveon.Core.DTOs.TokenDtos;
using Inveon.Core.Models;
using Inveon.Core.Repositories;
using Inveon.Core.Services;
using Inveon.Core.UnitOfWork;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Inveon.Service.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<UserRefreshToken> _userRefreshTokenService;

        public AuthenticationService( ITokenService tokenService, UserManager<AppUser> userManager, IUnitOfWork unitOfWork, IGenericRepository<UserRefreshToken> userRefreshTokenService)
        {
          

            _tokenService = tokenService;
            _userManager = userManager;
            _unitOfWork = unitOfWork;
            _userRefreshTokenService = userRefreshTokenService;
        }


        public async Task<Response<TokenDto>> CreateTokenAsync(LoginDto loginDto)
        {
            if (loginDto == null) throw new ArgumentNullException(nameof(loginDto));

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Response<TokenDto>.Fail("Email or Password is wrong", 400);

            if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return Response<TokenDto>.Fail("Email or Password is wrong", 400);
            }
            var token = _tokenService.CreateToken(user);

            var userRefreshToken = await _userRefreshTokenService.FindAsync(u => u.UserId == user.Id);

            if(userRefreshToken.IsNullOrEmpty())
            {
                await _userRefreshTokenService.AddAsync(new UserRefreshToken
                {
                    UserId = user.Id,
                    Code = token.RefreshToken,
                    Expiration = token.RefreshTokenExpiration
                });
            }
            else
            {
                userRefreshToken.FirstOrDefault().Code = token.RefreshToken;
                userRefreshToken.FirstOrDefault().Expiration = token.RefreshTokenExpiration;
            }
            await _unitOfWork.CommitAsync();
            return Response<TokenDto>.Success(token,200);


        }

        public async Task<Response<TokenDto>> CreateTokenByRefreshToken(string refreshToken)
        {
            var existRefreshToken = await _userRefreshTokenService.FindAsync(x => x.Code == refreshToken);

            if (existRefreshToken.IsNullOrEmpty())
            {
                return Response<TokenDto>.Fail("Refresh token not found", 404);
            }

            var user = await _userManager.FindByIdAsync(existRefreshToken.First().UserId.ToString());

            if (user == null)
            {
                return Response<TokenDto>.Fail("User Id not found", 404);
            }

            var tokenDto = _tokenService.CreateToken(user);

            existRefreshToken.FirstOrDefault().Code = tokenDto.RefreshToken);
            existRefreshToken.FirstOrDefault().Expiration = tokenDto.RefreshTokenExpiration;

            await _unitOfWork.CommitAsync();

            return Response<TokenDto>.Success(tokenDto, 200);
        }

        public async Task<Response<NoContent>> RevokeRefreshToken(string refreshToken)
        {
            var existRefreshToken = await _userRefreshTokenService.FindAsync(x => x.Code == refreshToken);
            if (existRefreshToken.IsNullOrEmpty())
            {
                return Response<NoContent>.Fail("Refresh token not found", 404);
            }

            await _userRefreshTokenService.DeleteAsync(existRefreshToken.FirstOrDefault().UserId);

            await _unitOfWork.CommitAsync();

            return Response<NoContent>.Success(200);
        }
    }
}
