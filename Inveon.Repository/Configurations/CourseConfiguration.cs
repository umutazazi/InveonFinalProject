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
    public class CourseConfiguration : IEntityTypeConfiguration<Course>
    {
        public void Configure(EntityTypeBuilder<Course> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(c => c.Description)
                .IsRequired()
                .HasMaxLength(2000);

            builder.Property(c => c.Price)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(c => c.Category)
                .IsRequired()
                .HasMaxLength(100);

            // Configure one-to-many relationship with Orders
            builder.HasMany(c => c.Orders)
                .WithOne(o => o.Course)
                .HasForeignKey(o => o.CourseId)
                .OnDelete(DeleteBehavior.Restrict); // Changed to Restrict

        }
    }
}
