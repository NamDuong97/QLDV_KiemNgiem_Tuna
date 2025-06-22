using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDeXuatPhongBanRepository
    {
        Task<IEnumerable<PhieuDeXuatPhongBan>> GetPhieuDeXuatPhongBansAllAsync();
        Task<PhieuDeXuatPhongBan?> FindPhieuDeXuatPhongBanAsync(string maPhieuDeXuatPhongBan, bool tracking);
        void CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
        Task ProcessUpdatePDXPBFromMauCancel(string maMau);
        void UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
        void DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
    }
}
