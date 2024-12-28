using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Models;

namespace Inveon.Core.Modelss
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; } = default!;
        public AppUser AppUser { get; set; } = default!;
        public int CourseId { get; set; } = default!;
        public Course Course { get; set; } = default!;
        public Payment Payment { get; set; }
        public int PaymentId { get; set; } 

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    }
}
