using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietPhieuDeXuatPhongBanRepository
    {
        Task<IEnumerable<ChiTietPhieuDeXuatPhongBan>> GetChiTietPhieuDeXuatPhongBansAllAsync();
        Task<ChiTietPhieuDeXuatPhongBan?> FindChiTietPhieuDeXuatPhongBanAsync(string maChiTietPhieuDeXuatPhongBan, bool tracking);
        void CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
        void UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
        void DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
    }
}
