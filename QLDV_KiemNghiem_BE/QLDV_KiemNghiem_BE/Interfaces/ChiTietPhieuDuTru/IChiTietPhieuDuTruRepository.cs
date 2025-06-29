using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietPhieuDuTruRepository
    {
        Task<IEnumerable<ChiTietPhieuDuTru>> GetChiTietPhieuDuTrusAllAsync();
        Task<ChiTietPhieuDuTru?> FindChiTietPhieuDuTruAsync(string maChiTietPhieuDuTru);
        Task<ChiTietPhieuDuTru?> FindChiTietPhieuDuTruByPDTAsync(string maPhieuDuTru, string maid, bool track);
        Task<List<ChiTietPhieuDuTru>?> FindChiTietPhieuDuTruByPDTsAsync(string maPhieuDuTru);
        void CreateChiTietPhieuDuTru(ChiTietPhieuDuTru ChiTietPhieuDuTru);
        void UpdateChiTietPhieuDuTruAsync(ChiTietPhieuDuTru ChiTietPhieuDuTru);
        void DeleteChiTietPhieuDuTruAsync(ChiTietPhieuDuTru ChiTietPhieuDuTru);
    }
}
