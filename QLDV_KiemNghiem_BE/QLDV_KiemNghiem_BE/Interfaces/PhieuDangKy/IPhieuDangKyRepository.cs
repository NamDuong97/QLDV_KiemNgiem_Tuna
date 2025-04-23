using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyRepository
    {
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync();
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAsync(PhieuDangKy phieuDangKy);
        void CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
    }
}
