using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyService
    {
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync();
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAsync(PhieuDangKy phieuDangKy);
        Task<bool> CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
    }
}
