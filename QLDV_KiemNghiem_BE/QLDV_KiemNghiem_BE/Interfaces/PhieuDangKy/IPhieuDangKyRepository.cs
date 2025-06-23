using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyRepository
    {
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesAllAsync(PhieuDangKyParam phieuDangKyParam);
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesOfCustomerAsync(string maKH, string maTrangThaiPhieuDangKy);
        Task<PhieuDangKy?> FindPhieuDangKyAsync(string maPhieuDangKy);
        Task CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        void UpdatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        void DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id, bool tracking);
        Task<int> DuTinhThoiGianKiemNghiem(string maDmMau, string maTieuChuan);

    }
}
