using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Inveon.Repository.Configurations
{
    public class AppUserConfigurations : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.HasMany(u => u.Orders)
                .WithOne(o => o.AppUser)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure one-to-many relationship with Payments
            builder.HasMany(u => u.Payments)
                .WithOne(p => p.AppUser)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict); // Changed to Restrict

            // Configure many-to-many relationship with Courses
            builder.HasMany(u => u.Courses)
                .WithMany(c => c.Users);



        }
    }
}
