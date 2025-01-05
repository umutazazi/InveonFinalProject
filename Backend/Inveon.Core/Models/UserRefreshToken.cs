using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.Models
{
    public class UserRefreshToken
    {
        public int Id { get; set; }
        public int UserId { get; set; } 
        public string Code { get; set; } 
        public DateTime Expiration { get; set; } 
    }
}
