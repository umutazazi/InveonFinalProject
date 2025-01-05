using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Modelss;

namespace Inveon.Core.Models
{
    public class Course
    {
       
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Category { get; set; }

        public string ImageUrl { get; set; }
        public int InstructorId { get; set; }
   
        public AppUser Instructor { get; set; }
        public ICollection<AppUser> Users { get; set; }
        public ICollection<Order> Orders { get; set; }


    }
}
