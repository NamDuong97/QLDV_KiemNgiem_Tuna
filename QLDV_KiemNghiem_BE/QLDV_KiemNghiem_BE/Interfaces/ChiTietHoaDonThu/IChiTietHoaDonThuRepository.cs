using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietHoaDonThuRepository
    {
        Task<IEnumerable<ChiTietHoaDonThu>> GetChiTietHoaDonThusAllAsync();
        Task<ChiTietHoaDonThu?> FindChiTietHoaDonThuAsync(string maChiTietHoaDonThu);
        Task CreateChiTietHoaDonThuAsync(ChiTietHoaDonThu ChiTietHoaDonThu);
        void UpdateChiTietHoaDonThuAsync(ChiTietHoaDonThu ChiTietHoaDonThu);
        void DeleteChiTietHoaDonThuAsync(ChiTietHoaDonThu ChiTietHoaDonThu);
    }
}
