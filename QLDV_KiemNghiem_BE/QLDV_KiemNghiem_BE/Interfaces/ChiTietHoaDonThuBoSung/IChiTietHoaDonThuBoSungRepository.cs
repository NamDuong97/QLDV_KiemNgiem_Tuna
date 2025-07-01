using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietHoaDonThuBoSungRepository
    {
        Task<IEnumerable<ChiTietHoaDonThuBoSung>> GetChiTietHoaDonThuBoSungsAllAsync();
        Task<ChiTietHoaDonThuBoSung?> FindChiTietHoaDonThuBoSungAsync(string maChiTietHoaDonThuBoSung, bool track);
        Task<ChiTietHoaDonThuBoSung?> FindChiTietHoaDonThuBoSungByHDBSAsync(string maPhieuDuTru, string maid, bool track);
        Task<List<ChiTietHoaDonThuBoSung>?> FindChiTietHoaDonThuBoSungByHDBSsAsync(string maPhieuDuTru, bool track);
        void CreateChiTietHoaDonThuBoSung(ChiTietHoaDonThuBoSung ChiTietHoaDonThuBoSung);
        void UpdateChiTietHoaDonThuBoSungAsync(ChiTietHoaDonThuBoSung ChiTietHoaDonThuBoSung);
        void DeleteChiTietHoaDonThuBoSungAsync(ChiTietHoaDonThuBoSung ChiTietHoaDonThuBoSung);
    }
}
