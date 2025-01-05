
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Inveon.Core.Models;
using Inveon.Core.Modelss;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Inveon.Repository.Configurations.Seed;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Options;


namespace Inveon.Repository
{
    public class AppDbContext:IdentityDbContext<AppUser,AppRole,int>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
           
        }
        
        public DbSet<Order> Orders { get; set; }
        public DbSet<Course> Courses{ get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfigurationsFromAssembly(GetType().Assembly);
            builder.SeedUsers();
            builder.SeedRoles();
            builder.SeedUserRoles();
            builder.SeedCourses();
        
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));
        }
    }
}
