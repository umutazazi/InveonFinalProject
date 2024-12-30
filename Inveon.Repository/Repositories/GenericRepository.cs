using System;
using System.Collections.Generic;
using System.Formats.Tar;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Inveon.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Inveon.Repository.Repositories
{
    public class GenericRepository<Tentity>() : IGenericRepository<Tentity> where Tentity : class
    {
        private readonly AppDbContext _appDbContext;
        private readonly DbSet<Tentity> _dbSet;
        public GenericRepository(AppDbContext appDbContext) : this()
        {
            _appDbContext = appDbContext;
            _dbSet = appDbContext.Set<Tentity>();
        }
        public async Task AddAsync(Tentity entity)
        {
            await _dbSet.AddAsync(entity);
        }
        public async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            _dbSet.Remove(entity);
        }
        public async Task<IEnumerable<Tentity>> FindAsync(Expression<Func<Tentity, bool>> predicate)
        {
            return await _dbSet.Where(predicate).ToListAsync();
        }
        public async Task<IEnumerable<Tentity>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }
        public async Task<Tentity> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }
        public async Task UpdateAsync(Tentity entity)
        {
            _dbSet.Update(entity);
        }
    }
}
