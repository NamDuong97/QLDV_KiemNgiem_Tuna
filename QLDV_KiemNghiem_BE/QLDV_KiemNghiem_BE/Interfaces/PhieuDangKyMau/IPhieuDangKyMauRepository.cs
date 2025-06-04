using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyMauRepository
    {
        Task<IEnumerable<PhieuDangKyMau>> GetPhieuDangKyMauAllAsync();
        Task<PhieuDangKyMau?> GetPhieuDangKyMauAsync(string maPhieuDangKyMau);
        void CreatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau);
        void UpdatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau);
        void DeletePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau);
        Task<PhieuDangKyMau?> CheckExistPhieuDangKyMauAsync(string phieuDangKyMau, string phieuDangKy);
    }
}
