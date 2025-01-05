using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Repository
{
    public class UnitOfWork(AppDbContext appDbContext) : IUnitOfWork
    {
        

        public async Task CommitAsync()
        {
          await  appDbContext.SaveChangesAsync();
        }

        public void Commit()
        {
          appDbContext.SaveChanges();
        }
    }
}
