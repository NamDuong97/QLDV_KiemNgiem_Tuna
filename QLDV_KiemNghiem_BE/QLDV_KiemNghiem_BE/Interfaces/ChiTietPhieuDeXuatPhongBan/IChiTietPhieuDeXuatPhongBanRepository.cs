using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietPhieuDeXuatPhongBanRepository
    {
        Task<IEnumerable<ChiTietPhieuDeXuatPhongBan>> GetChiTietPhieuDeXuatPhongBansAllAsync();
        Task<ChiTietPhieuDeXuatPhongBan?> FindChiTietPhieuDeXuatPhongBanAsync(string maChiTietPhieuDeXuatPhongBan, bool tracking);
        void CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
        Task<List<ChiTietPhieuDeXuatPhongBan>?> CheckSampleAssignedToDepartment(CheckSampleAssignedToDepartmentModel checkSample);
        void UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
        void DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
    }
}
