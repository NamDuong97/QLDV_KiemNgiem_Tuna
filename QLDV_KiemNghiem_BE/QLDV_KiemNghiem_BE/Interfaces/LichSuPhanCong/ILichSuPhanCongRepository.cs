
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ILichSuPhanCongRepository
    {
        Task<PagedList<LichSuPhanCong>> GetLichSuPhanCongsAllAsync(LichSuPhanCongParam param);
        Task<LichSuPhanCong?> FindLichSuPhanCongAsync(string maLichSuPhanCong);
        Task<LichSuPhanCong?> FindLichSuPhanCongByPCHienTaiAsync(string maPhanCong, string manvXuLy, bool track);
        Task<List<LichSuPhanCong>?> FindLichSuPhanCongByPCNBAsync(string maPhanCong, bool track);
        void CreateLichSuPhanCongAsync(LichSuPhanCong LichSuPhanCong);
        void UpdateLichSuPhanCongAsync(LichSuPhanCong LichSuPhanCong);
        void DeleteLichSuPhanCongAsync(LichSuPhanCong LichSuPhanCong);
    }
}
