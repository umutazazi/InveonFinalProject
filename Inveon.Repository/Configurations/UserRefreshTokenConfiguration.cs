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
    public class UserRefreshTokenConfiguration:IEntityTypeConfiguration<UserRefreshToken>
    {
      

        public void Configure(EntityTypeBuilder<UserRefreshToken> builder)
        {

          builder.HasKey(x => x.Id);
          builder.Property(x => x.Code).IsRequired().HasMaxLength(200);

        }
    }
}
