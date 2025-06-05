using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IHoaDonThuService
    {
        Task<IEnumerable<HoaDonThuDto>> GetHoaDonThusAllAsync();
        Task<IEnumerable<HoaDonThuDto>> GetPhieuDangKiesOfCustomer(string maKH);
        Task<HoaDonThuDto?> FindHoaDonThuAsync(string maHoaDonThu);
        Task<ResponseModel1<HoaDonThuDto>> CreateHoaDonThuAsync(PhieuDangKyDto phieuDangKy);
        Task<bool> UpdateHoaDonThuAsync(HoaDonThuDto HoaDonThuDto);
        Task<bool> DeleteHoaDonThuAsync(HoaDonThu HoaDonThu);
    }
}
