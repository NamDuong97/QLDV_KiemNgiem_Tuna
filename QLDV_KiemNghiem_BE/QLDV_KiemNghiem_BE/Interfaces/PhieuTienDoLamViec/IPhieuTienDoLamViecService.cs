using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuTienDoLamViecService
    {
        Task<(IEnumerable<PhieuTienDoLamViecProcedureDto> datas, Pagination pagi)> GetPhieuTienDoLamViecAllAsync(PhieuTienDoLamViecParam param);
        Task<PhieuTienDoLamViecProcedureDto?> FindPhieuTienDoLamViecShowAsync(string maPhieuTienDoLamViec);
        Task<PhieuTienDoLamViecDto?> FindPhieuTienDoLamViecAsync(string maPhieuTienDoLamViec);
        Task<ResponseModel1<PhieuTienDoLamViecDto>> CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViecRequestCreateDto PhieuTienDoLamViecDto, string user, string userId);
        Task<ResponseModel1<PhieuTienDoLamViecDto>> UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViecRequestUpdateDto PhieuTienDoLamViecDto, string user, string userId);
        Task<ResponseModel1<PhieuTienDoLamViecDto>> ReviewPhieuTienDoLamViec(PhieuTienDoLamViecRequestReviewDto PhieuTienDoLamViecDto, string user, string userId);
        Task<ResponseModel1<PhieuTienDoLamViecDto>> DeletePhieuTienDoLamViecAsync(string maPhieuTienDoLamViec, string user, string userId);
    }
}
