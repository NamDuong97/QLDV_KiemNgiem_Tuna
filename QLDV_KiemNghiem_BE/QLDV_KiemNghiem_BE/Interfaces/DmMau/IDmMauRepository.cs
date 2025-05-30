using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDmMauRepository
    {
        Task<IEnumerable<DmMau>> GetDmMausAllAsync();
        Task<DmMau?> FindDmMauAsync(string maDmMau);
        //Task<DmMau?> FindDmMauByNameAsync(string tenDmMau);
        void CreateDmMauAsync(DmMau DmMau);
        void UpdateDmMauAsync(DmMau DmMau);
        void DeleteDmMauAsync(DmMau DmMau);
    }
}
