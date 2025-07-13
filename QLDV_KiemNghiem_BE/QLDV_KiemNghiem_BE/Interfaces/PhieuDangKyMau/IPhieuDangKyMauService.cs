using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyMauService
    {
        Task<(IEnumerable<PhieuDangKyMauProcedureDto> datas, Pagination pagi)> GetPhieuDangKyMauAllAsync(PhieuDangKyMauParam param);
        Task<PhieuDangKyMauDto?> GetPhieuDangKyMauAsync(string maPhieuDangKyMau);
        PhieuDangKyMauThongKeDto? GetPhieuDangKyMauThongKe();
        Task<ResponseModel1<PhieuDangKyMauDto>> CreatePhieuDangKyMauAsync(PhieuDangKyMauDto PhieuDangKyMau, string user);
        Task<ResponseModel1<PhieuDangKyMauDto>> CancelPhieuDangKyMauByKHTH(PhieuDangKyMauRequestCancelByKHTHDto mauDto, string user);
        Task<ResponseModel1<PhieuDangKyMauDto>> CancelPhieuDangKyMauByLDP(PhieuDangKyMauRequestCancelByLDPDto mauDto, string user, string userId);
        Task<ResponseModel1<PhieuDangKyMauDto>> ReviewCancelPhieuDangKyMauByBLD(PhieuDangKyMauRequestReviewCancelByBLDDto mauDto, string user, string userId);
        Task<PhieuDangKyMauThongKeProcedure?> CheckPhieuDangKyMauFromTableProcedure(string maMau);
        Task<ResponseModel1<PhieuDangKyMauDto>> UpdatePhieuDangKyMauAsync(PhieuDangKyMauDto PhieuDangKyMau, string user);
        Task<bool> DeletePhieuDangKyMauAsync(string maPhieuDangKyMau, string user);
    }
}
