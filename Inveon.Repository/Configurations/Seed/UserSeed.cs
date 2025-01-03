using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Models;
using Microsoft.AspNetCore.Identity;

namespace Inveon.Repository.Configurations.Seed
{
    public static class UserSeed
    {
        public static void SeedUsers(this ModelBuilder builder)
        {
            // Create password hasher to hash default passwords
            var hasher = new PasswordHasher<AppUser>();

            // Create admin user
            var adminUser = new AppUser
            {
                Id = 1,
                UserName = "adminexample",
                NormalizedUserName = "ADMIN@EXAMPLE.COM",
                Email = "admin@example.com",
                NormalizedEmail = "ADMIN@EXAMPLE.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                PhoneNumber = "+1234567890",
                PhoneNumberConfirmed = true,
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0,
                
            };
            adminUser.PasswordHash = hasher.HashPassword(adminUser, "Admin123!");

            // Create instructor user
            var instructorUser = new AppUser
            {
                Id = 2,
                UserName = "instructorexample",
                NormalizedUserName = "INSTRUCTOR@EXAMPLE.COM",
                Email = "instructor@example.com",
                NormalizedEmail = "INSTRUCTOR@EXAMPLE.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                PhoneNumber = "+1234567891",
                PhoneNumberConfirmed = true,
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0,
               
            };
            instructorUser.PasswordHash = hasher.HashPassword(instructorUser, "Instructor123!");

            // Create regular user
            var regularUser = new AppUser
            {
                Id = 3,
                UserName = "userexample",
                NormalizedUserName = "USER@EXAMPLE.COM",
                Email = "user@example.com",
                NormalizedEmail = "USER@EXAMPLE.COM",
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                ConcurrencyStamp = Guid.NewGuid().ToString(),
                PhoneNumber = "+1234567892",
                PhoneNumberConfirmed = true,
                TwoFactorEnabled = false,
                LockoutEnabled = false,
                AccessFailedCount = 0,
               
            };
            regularUser.PasswordHash = hasher.HashPassword(regularUser, "User123!");

            builder.Entity<AppUser>().HasData(adminUser, instructorUser, regularUser);
        }

    }
}
