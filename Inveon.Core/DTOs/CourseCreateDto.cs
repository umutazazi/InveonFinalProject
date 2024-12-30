using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inveon.Core.DTOs
{
    public record CourseCreateDto(
        string Name,
        string Description,
        decimal Price,
        string Category
    );
}
