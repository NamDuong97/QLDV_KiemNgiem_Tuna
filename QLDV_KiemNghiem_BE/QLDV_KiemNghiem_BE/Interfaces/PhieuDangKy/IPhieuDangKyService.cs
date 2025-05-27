using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyService
    {
        Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesAllAsync();
        Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesOfCustomerAsync(string maKH);
        Task<PhieuDangKyDto?> FindPhieuDangKyAsync(string maPhieuDangKy);
        Task<bool> CreatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto);
        Task<bool> UpdatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto);
        Task<bool> DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id);
        Task<int> DuTinhThoiGianKiemNghiem(string maTieuChuan);
    }
}
