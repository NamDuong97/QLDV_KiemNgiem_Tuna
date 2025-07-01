using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietHoaDonThuBoSungService
    {
        Task<IEnumerable<ChiTietHoaDonThuBoSungDto>> GetChiTietHoaDonThuBoSungsAllAsync();
        Task<ChiTietHoaDonThuBoSungDto?> FindChiTietHoaDonThuBoSungAsync(string maChiTietHoaDonThuBoSung);
        Task<ResponseModel1<ChiTietHoaDonThuBoSungDto>> CreateChiTietHoaDonThuBoSungAsync(ChiTietHoaDonThuBoSungRequestCreateDto ChiTietHoaDonThuBoSungDto);
        Task<ResponseModel1<ChiTietHoaDonThuBoSungDto>> UpdateChiTietHoaDonThuBoSungAsync(ChiTietHoaDonThuBoSungRequestUpdateDto ChiTietHoaDonThuBoSungDto);
        Task<ResponseModel1<ChiTietHoaDonThuBoSungDto>> DeleteChiTietHoaDonThuBoSungAsync(string maChiTietHoaDonThuBoSung);
    }
}
