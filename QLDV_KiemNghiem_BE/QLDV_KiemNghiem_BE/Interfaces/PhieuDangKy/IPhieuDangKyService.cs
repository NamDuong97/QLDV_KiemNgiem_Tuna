using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyService
    {
        Task<(IEnumerable<PhieuDangKyDto> datas, Pagination pagi)> GetPhieuDangKiesAllAsync(PhieuDangKyParam phieuDangKyParam);
        Task<IEnumerable<PhieuDangKyDto>> GetPhieuDangKiesOfCustomerAsync(string maKH, string maTrangThaiPhieuDangKy);
        Task<PhieuDangKyDto?> FindPhieuDangKyAsync(string maPhieuDangKy);
        ThongKePhieuDangKyProcedure? GetPhieuDangKyThongKe();
        Task<ResponseModel1<PhieuDangKyDto>> CreatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto, string user);
        Task<ResponseModel1<PhieuDangKyDto>> UpdatePhieuDangKyAsync(PhieuDangKyDto phieuDangKyDto, string user);
        Task<ResponseModel1<PhieuDangKyDto>> DeletePhieuDangKyAsync(string maPhieuDangKy, string user);
        Task<PhieuDangKy?> CheckExistPhieuDangKyAsync(string id, bool tracking);
        Task<int> DuTinhThoiGianKiemNghiem(string maDmMau, string maTieuChuan);
        Task<ResponReviewPhieuDangKy> ReviewPhieuDangKyByKHDT(RequestReviewPhieuDangKy duyetPhieu, string user, string userId);
        Task<ResponReviewPhieuDangKy> ReviewPhieuDangKyByBLD(RequestReviewPhieuDangKy duyetPhieu, string user, string userId);
        Task<ResponseUndoReviewPhieuDangKy> UndoReviewPhieuDangKyByBLD(RequestUndoReviewPhieuDangKy duyetPhieu, string user, string userId);
    }
}
