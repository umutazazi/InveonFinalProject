using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Modelss;
using Microsoft.AspNetCore.Identity;

namespace Inveon.Core.Models
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<Order>? Orders { get; set; }
        public ICollection<Course>? Courses { get; set; }
        public ICollection<Payment>? Payments { get; set; }


    

}
}
