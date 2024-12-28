using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Modelss;

namespace Inveon.Core.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int UserId { get; set; } = default!;
        public AppUser AppUser { get; set; } = default!;
        public int OrderId { get; set; } = default!;
        public Order Order { get; set; } = default!;
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; } = default!;
        public DateTime PaymentDate { get; set; } = DateTime.UtcNow;
    }
}
