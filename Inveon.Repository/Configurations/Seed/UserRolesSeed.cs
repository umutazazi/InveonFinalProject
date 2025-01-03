using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Repository.Configurations.Seed
{
    public static class UserRolesSeed
    {
        public static void SeedUserRoles(this ModelBuilder builder)
        {
            builder.Entity<IdentityUserRole<int>>().HasData(
                new IdentityUserRole<int>
                {
                    RoleId = 1, // Admin role
                    UserId = 1  // Admin user
                },
                new IdentityUserRole<int>
                {
                    RoleId = 3, // Instructor role
                    UserId = 2  // Instructor user
                },
                new IdentityUserRole<int>
                {
                    RoleId = 2, // User role
                    UserId = 3  // Regular user
                }
            );
        }
    }
}
