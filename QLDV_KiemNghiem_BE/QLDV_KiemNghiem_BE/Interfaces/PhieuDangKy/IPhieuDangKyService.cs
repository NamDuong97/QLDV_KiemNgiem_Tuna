using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyService
    {
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync();
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAsync(string maKH);
        Task<bool> CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        Task<bool> UpdatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        Task<bool> DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        Task<PhieuDangKy> CheckExistPhieuDangKyAsync(string id);
    }
}
