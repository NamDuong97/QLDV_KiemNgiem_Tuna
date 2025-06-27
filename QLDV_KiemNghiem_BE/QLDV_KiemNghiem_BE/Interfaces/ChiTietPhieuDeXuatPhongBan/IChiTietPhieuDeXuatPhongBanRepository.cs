using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietPhieuDeXuatPhongBanRepository
    {
        Task<IEnumerable<ChiTietPhieuDeXuatPhongBan>> GetChiTietPhieuDeXuatPhongBansAllAsync();
        Task<ChiTietPhieuDeXuatPhongBan?> FindChiTietPhieuDeXuatPhongBanAsync(string maChiTietPhieuDeXuatPhongBan, bool tracking);
        Task<List<ChiTietPhieuDeXuatPhongBan>?> FindChiTietPhieuDeXuatPhongBanByMaMauAsync(string maMau, bool tracking);
        void CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
        Task<int> CheckAllSamplesApproved_PDXPB(string maPDXPB, string maCTDXPB);
        Task ProcessUpdatePDXPBFromMauCancel(string maCTDXPB, string maPDXPB, string maMau, string user);
        Task<int>ProcessReviewChiTietDeXuatPhongBanByPB(string maCTPDXPB, string maMau, bool action, string user, string content, string userId);
        Task<int> ProcessReviewChiTietDeXuatPhongBanByBLD(string maCTPDXPB, string maMau, bool action, string user, string userId);
        Task<int> CheckAllSamplesCancel_PDXPB(string maPDXPB, string maCTDXPB);
        Task<List<ChiTietPhieuDeXuatPhongBan>?> CheckSampleAssignedToDepartment(CheckSampleAssignedToDepartmentModel checkSample);
        void UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
        void DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
    }
}
