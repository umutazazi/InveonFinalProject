using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Configurations;

using Inveon.Core.DTOs.TokenDtos;
using Inveon.Core.Models;
using Inveon.Core.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Inveon.Service.Services
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly CustomTokenOption _tokenOption;
    

        public TokenService(UserManager<AppUser> userManager, CustomTokenOption tokenOption)
        {
            _userManager = userManager;
            _tokenOption = tokenOption;
          
            
           

        }

        public TokenDto CreateToken(AppUser appUser)
        {
            var accessTokenExpiration = DateTime.Now.AddMinutes(_tokenOption.AccessTokenExpiration);
            var refreshTokenExpiration = DateTime.Now.AddMinutes(_tokenOption.RefreshTokenExpiration);
            var securityKey = SignService.GetSymmetricSecurityKey(_tokenOption.SecurityKey);

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(
                issuer: _tokenOption.Issuer,
                expires: accessTokenExpiration,
                claims: GetClaims(appUser,_tokenOption.Audience),
                signingCredentials: signingCredentials);

            var handler = new JwtSecurityTokenHandler();

            var token = handler.WriteToken(jwtSecurityToken);

            var tokenDto = new TokenDto
                (
                    token,
                    accessTokenExpiration,
                    CreateRefreshToken(),
                    refreshTokenExpiration
                    );
                

            return tokenDto;
        }
        private string CreateRefreshToken()

        {
            var numberByte = new Byte[32];

            using var rnd = RandomNumberGenerator.Create();

            rnd.GetBytes(numberByte);

            return Convert.ToBase64String(numberByte);
        }
       

        private IEnumerable<Claim> GetClaims(AppUser appUser, List<String> audiences)
        {
            var userList = new List<Claim> {
                new Claim(JwtRegisteredClaimNames.Sub,appUser.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, appUser.Email),
                new Claim(JwtRegisteredClaimNames.GivenName,appUser.UserName),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
            };


            var userRoles = _userManager.GetRolesAsync(appUser).Result;

            foreach (var userRole in userRoles)
            {
                userList.Add(new Claim("roles", userRole));

            }



            userList.AddRange(audiences.Select(x => new Claim(JwtRegisteredClaimNames.Aud, x)));

            return userList;
        }
     




    }

}
