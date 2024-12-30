using Inveon.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper.Internal.Mappers;
using Inveon.Core.DTOs.Shared;
using Inveon.Core.Repositories;
using Inveon.Core.UnitOfWork;
using Inveon.Repository.Repositories;

namespace Inveon.Service.Services
{
    public class ServiceGeneric<TEntity, TDto>(IUnitOfWork unitOfWork, IGenericRepository<TEntity> genericRepository)
        : IServiceGeneric<TEntity, TDto>
        where TEntity : class
        where TDto : class
    {
        public async Task<Response<TDto>> GetByIdAsync(int id)
        {
          var entitiy = await genericRepository.GetByIdAsync(id);

          if (entitiy == null)
            {
                return Response<TDto>.Fail("Id not found", 404);
            }
          return Response<TDto>.Success(ObjectMapper.Mapper.Map<TDto>(entitiy), 200);
        }

        public async Task<Response<IEnumerable<TDto>>> GetAllAsync()
        {
            var entities = ObjectMapper.Mapper.Map<List<TDto>>(await genericRepository.GetAllAsync());

            return Response<IEnumerable<TDto>>.Success(entities, 200);
        }

        public async Task<Response<TDto>> AddAsync(TDto entity)
        {
            var newEntity = ObjectMapper.Mapper.Map<TEntity>(entity);
            await genericRepository.AddAsync(newEntity);
            await unitOfWork.CommitAsync();
            var newDto = ObjectMapper.Mapper.Map<TDto>(newEntity);
            return Response<TDto>.Success(ObjectMapper.Mapper.Map<TDto>(newDto), statusCode:200);
        }

        public async Task<Response<NoContent>> UpdateAsync(int id, TDto dto)
        {
            var entity = await genericRepository.GetByIdAsync(id);
            if (entity == null)
            {
                return Response<NoContent>.Fail("Id not found", 404);
            }
            var updateEntity = ObjectMapper.Mapper.Map<TEntity>(entity);
            await genericRepository.UpdateAsync(updateEntity);
            await unitOfWork.CommitAsync();
            return Response<NoContent>.Success(statusCode:204);

        }

        public async Task<Response<NoContent>> DeleteAsync(int id)
        {
            var entity = await genericRepository.GetByIdAsync(id);
            if (entity == null)
            {
                return Response<NoContent>.Fail("Id not found", 404);
            }
            await genericRepository.DeleteAsync(id);
            await unitOfWork.CommitAsync();

            return Response<NoContent>.Success(statusCode: 204);
        }
    }
}
