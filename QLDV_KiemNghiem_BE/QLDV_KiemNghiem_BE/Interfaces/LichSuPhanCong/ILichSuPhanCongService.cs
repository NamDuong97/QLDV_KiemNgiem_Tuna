using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ILichSuPhanCongService
    {
        Task<(IEnumerable<LichSuPhanCongDto> datas, Pagination pagi)> GetLichSuPhanCongsAllAsync(LichSuPhanCongParam param);
        Task<LichSuPhanCongDto?> FindLichSuPhanCongAsync(string maLichSuPhanCong);
        Task<ResponseModel1<LichSuPhanCongDto>> CreateLichSuPhanCongAsync(LichSuPhanCongRequestCreateDto LichSuPhanCongDto, string user, string userId);
        Task<ResponseModel1<LichSuPhanCongDto>> UpdateLichSuPhanCongAsync(LichSuPhanCongRequestUpdateDto LichSuPhanCongDto, string user, string userId);
        Task<bool> DeleteLichSuPhanCongAsync(LichSuPhanCong LichSuPhanCong);
    }
}
