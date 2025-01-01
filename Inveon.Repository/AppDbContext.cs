
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Inveon.Core.Models;
using Inveon.Core.Modelss;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(GetType().Assembly);
            base.OnModelCreating(builder);

       
            
        }
    }
}
