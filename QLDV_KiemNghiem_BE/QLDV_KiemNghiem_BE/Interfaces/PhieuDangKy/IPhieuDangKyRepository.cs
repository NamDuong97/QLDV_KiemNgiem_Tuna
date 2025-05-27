using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyRepository
    {
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync();
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesOfCustomerAsync(string maKH);
        Task<PhieuDangKy?> FindPhieuDangKyAsync(string maPhieuDangKy);
        void CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        void UpdatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        void DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id);
        Task<int> DuTinhThoiGianKiemNghiem(string maTieuChuan);

    }
}
