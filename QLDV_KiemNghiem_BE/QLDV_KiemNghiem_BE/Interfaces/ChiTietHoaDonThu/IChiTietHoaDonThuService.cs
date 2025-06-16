using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietHoaDonThuService
    {
        Task<IEnumerable<ChiTietHoaDonThuDto>> GetChiTietHoaDonThusAllAsync();
        Task<ChiTietHoaDonThuDto?> FindChiTietHoaDonThuAsync(string maChiTietHoaDonThu);
        Task<bool> CreateChiTietHoaDonThuAsync(ChiTietHoaDonThuDto ChiTietHoaDonThuDto);
        Task<bool> UpdateChiTietHoaDonThuAsync(ChiTietHoaDonThuDto ChiTietHoaDonThuDto);
        Task<bool> DeleteChiTietHoaDonThuAsync(ChiTietHoaDonThu ChiTietHoaDonThu);
    }
}
