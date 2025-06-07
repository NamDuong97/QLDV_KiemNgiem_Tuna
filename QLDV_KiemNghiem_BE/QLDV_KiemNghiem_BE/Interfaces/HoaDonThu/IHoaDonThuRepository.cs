using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IHoaDonThuRepository
    {
        Task<IEnumerable<HoaDonThu>> GetHoaDonThusAllAsync();
        Task<IEnumerable<HoaDonThu>> GetHoaDonThuOfCustomer(string maKH);
        Task<decimal> GetToTalMoneyOfMau(string dmMau, string maTieuChuan, string maLoaiDichVu);
        Task<HoaDonThu?> FindHoaDonThuAsync(string maHoaDonThu);
        Task CreateHoaDonThuAsync(HoaDonThu HoaDonThu);
        void UpdateHoaDonThuAsync(HoaDonThu HoaDonThu);
        Task<HoaDonThu> UpdateHoaDonThuByMaPhieuDangKyAsync(string maPhieuDangKy);
        void DeleteHoaDonThuAsync(HoaDonThu HoaDonThu);
    }
}
