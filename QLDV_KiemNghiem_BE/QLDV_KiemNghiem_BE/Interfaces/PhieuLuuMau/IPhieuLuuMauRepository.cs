
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuLuuMauRepository
    {
        Task<IEnumerable<PhieuLuuMau>> GetPhieuLuuMausAllAsync();
        Task<PhieuLuuMau?> FindPhieuLuuMauAsync(string maPhieuLuuMau);
        void CreatePhieuLuuMauAsync(PhieuLuuMau PhieuLuuMau);
        void UpdatePhieuLuuMauAsync(PhieuLuuMau PhieuLuuMau);
        void DeletePhieuLuuMauAsync(PhieuLuuMau PhieuLuuMau);
    }
}
