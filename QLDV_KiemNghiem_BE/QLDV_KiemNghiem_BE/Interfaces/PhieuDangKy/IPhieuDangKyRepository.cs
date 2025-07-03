using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyRepository
    {
        Task<PagedList<PhieuDangKy>> GetPhieuDangKiesAllAsync(PhieuDangKyParam pr);
        Task<IEnumerable<PhieuDangKy>> GetPhieuDangKiesOfCustomerAsync(string maKH, string maTrangThaiPhieuDangKy);
        Task<PhieuDangKy?> FindPhieuDangKyAsync(string maPhieuDangKy);
        ThongKePhieuDangKyProcedure? GetPhieuDangKyThongKe();
        Task CreatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        void UpdatePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        void DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id, bool tracking);
        Task<int> DuTinhThoiGianKiemNghiem(string maDmMau, string maTieuChuan);

    }
}
