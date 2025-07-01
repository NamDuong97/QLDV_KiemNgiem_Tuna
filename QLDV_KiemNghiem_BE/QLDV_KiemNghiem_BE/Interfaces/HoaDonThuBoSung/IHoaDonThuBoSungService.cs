using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IHoaDonThuBoSungService
    {
        Task<(IEnumerable<HoaDonThuBoSungProcedureDto> datas, Pagination pagi)> GetHoaDonThuBoSungAllAsync(HoaDonThuBoSungParam param);
        Task<HoaDonThuBoSungProcedureDto?> FindHoaDonThuBoSungShowAsync(string maHoaDonThuBoSung);
        Task<HoaDonThuBoSungDto?> FindHoaDonThuBoSungAsync(string maHoaDonThuBoSung);
        Task<ResponseModel1<HoaDonThuBoSungDto>> CreateHoaDonBoSungAsync(HoaDonThuBoSungRequestCreateDto hoaDonThuBoSungDto, string user, string userId);
        Task<ResponseModel1<HoaDonThuBoSungDto>> UpdateHoaDonThuBoSungAsync(HoaDonThuBoSungRequestUpdateDto HoaDonThuBoSungDto, string user, string userId);
        Task<ResponseModel1<HoaDonThuBoSungDto>> DeleteHoaDonThuBoSungAsync(string maHoaDonThuBoSung, string user, string userId);
    }
}
