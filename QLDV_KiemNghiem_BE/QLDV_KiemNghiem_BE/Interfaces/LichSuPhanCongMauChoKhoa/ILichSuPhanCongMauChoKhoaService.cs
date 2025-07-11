using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ILichSuPhanCongMauChoKhoaService
    {
        Task<(IEnumerable<LichSuPhanCongMauChoKhoaDto> datas, Pagination pagi)> GetLichSuPhanCongMauChoKhoasAllAsync(LichSuPhanCongMauChoKhoaParam param);
        Task<LichSuPhanCongMauChoKhoaDto?> FindLichSuPhanCongMauChoKhoaAsync(string maLichSuPhanCongMauChoKhoa);
        Task<ResponseModel1<LichSuPhanCongMauChoKhoaDto>> CreateLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoaRequestCreateDto LichSuPhanCongMauChoKhoaDto, string user, string userId);
        Task<ResponseModel1<LichSuPhanCongMauChoKhoaDto>> UpdateLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoaRequestUpdateDto LichSuPhanCongMauChoKhoaDto, string user, string userId);
        Task<bool> DeleteLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa LichSuPhanCongMauChoKhoa);
    }
}
