using CRM.DTO.Garden;
using CRM.Models;

namespace CRM.Services.Interface
{
    public interface IFieldService
    {
        Task<IEnumerable<Field>> GetAllAsync();
        Task<Field> GetByIdAsync(int id);
        Task<int> AddAsync(AddGardenDTO garden);
        Task UpdateAsync(UpdateGardenDTO garden);
        Task DeleteAsync(int id);
    }
}
