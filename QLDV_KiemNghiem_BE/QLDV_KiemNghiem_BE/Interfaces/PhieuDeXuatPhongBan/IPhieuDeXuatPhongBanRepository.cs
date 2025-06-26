using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDeXuatPhongBanRepository
    {
        Task<PagedList<PhieuDeXuatPhongBan>> GetPhieuDeXuatPhongBansAllAsync(PhieuDeXuatPhongBanParam param);
        Task<PhieuDeXuatPhongBan?> FindPhieuDeXuatPhongBanAsync(string maPhieuDeXuatPhongBan, bool tracking);
        void CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
        void UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
        void DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
    }
}
