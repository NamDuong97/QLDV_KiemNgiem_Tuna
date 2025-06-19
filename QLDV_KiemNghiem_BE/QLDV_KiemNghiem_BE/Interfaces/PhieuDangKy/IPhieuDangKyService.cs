using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyService
    {
        Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesAllAsync(PhieuDangKyParam phieuDangKyParam);
        Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesOfCustomerAsync(string maKH, string maTrangThaiPhieuDangKy);
        Task<PhieuDangKyDto?> FindPhieuDangKyAsync(string maPhieuDangKy);
        Task<ResponseModel1<PhieuDangKyDto>> CreatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto, string user);
        Task<ResponseModel1<PhieuDangKyDto>> UpdatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto, string user);
        Task<bool> DeletePhieuDangKyAsync(PhieuDangKy phieuDangKy);
        Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id, bool tracking);
        Task<int> DuTinhThoiGianKiemNghiem(string maDmMau, string maTieuChuan);
        Task<ResponReviewPhieuDangKy> ReviewPhieuDangKyByKHDT(RequestReviewPhieuDangKy duyetPhieu);
        Task<ResponReviewPhieuDangKy> ReviewPhieuDangKyByBLD(RequestReviewPhieuDangKy duyetPhieu);
    }
}
