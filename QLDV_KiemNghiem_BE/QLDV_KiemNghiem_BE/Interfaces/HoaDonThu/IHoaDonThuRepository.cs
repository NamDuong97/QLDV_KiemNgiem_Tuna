using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IHoaDonThuRepository
    {
        Task<IEnumerable<HoaDonThu>> GetHoaDonThusAllAsync();
        Task<IEnumerable<HoaDonThu>> GetPhieuDangKiesOfCustomer(string maKH);
        Task<HoaDonThu?> FindHoaDonThuAsync(string maHoaDonThu);
        Task CreateHoaDonThuAsync(HoaDonThu HoaDonThu);
        void UpdateHoaDonThuAsync(HoaDonThu HoaDonThu);
        void DeleteHoaDonThuAsync(HoaDonThu HoaDonThu);
    }
}
