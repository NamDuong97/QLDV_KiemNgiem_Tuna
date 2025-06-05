using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IHoaDonThuService
    {
        Task<IEnumerable<HoaDonThuDto>> GetHoaDonThusAllAsync();
        Task<IEnumerable<HoaDonThuDto>> GetPhieuDangKiesOfCustomer(string maKH);
        Task<HoaDonThuDto?> FindHoaDonThuAsync(string maHoaDonThu);
        Task<bool> CreateHoaDonThuAsync(HoaDonThuDto HoaDonThuDto);
        Task<bool> UpdateHoaDonThuAsync(HoaDonThuDto HoaDonThuDto);
        Task<bool> DeleteHoaDonThuAsync(HoaDonThu HoaDonThu);
    }
}
