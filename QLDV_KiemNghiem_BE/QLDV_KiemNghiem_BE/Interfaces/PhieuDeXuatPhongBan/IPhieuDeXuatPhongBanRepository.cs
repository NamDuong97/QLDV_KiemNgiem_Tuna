using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDeXuatPhongBanRepository
    {
        Task<IEnumerable<PhieuDeXuatPhongBan>> GetPhieuDeXuatPhongBansAllAsync();
        Task<PhieuDeXuatPhongBan?> FindPhieuDeXuatPhongBanAsync(string maPhieuDeXuatPhongBan, bool tracking);
        Task<int> CheckAllPDXPBApproved(string maPDXPB, string maPDK)
        void CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
        void UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
        void DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
    }
}
