using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyService
    {
        Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesAllAsync(PhieuDangKyParam phieuDangKyParam);
        Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesOfCustomerAsync(string maKH, string maTrangThaiPhieuDangKy);
        Task<PhieuDangKyDto?> FindPhieuDangKyAsync(string maPhieuDangKy);
        Task<bool> CreatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto);
        Task<bool> UpdatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto);
        Task<bool> DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id);
        Task<int> DuTinhThoiGianKiemNghiem(string maTieuChuan);
    }
}
