using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ILichSuPhanCongMauChoKhoaRepository
    {
        Task<PagedList<LichSuPhanCongMauChoKhoa>> GetLichSuPhanCongMauChoKhoasAllAsync(LichSuPhanCongMauChoKhoaParam param);
        Task<LichSuPhanCongMauChoKhoa?> FindLichSuPhanCongMauChoKhoaAsync(string maLichSuPhanCongMauChoKhoa, bool track);
        Task<LichSuPhanCongMauChoKhoa?> FindLichSuPhanCongMauChoKhoaByMaMauAndKhoaAsync(string maMau, string maKhoa, bool track);
        void CreateLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa LichSuPhanCongMauChoKhoa);
        void UpdateLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa LichSuPhanCongMauChoKhoa);
        void DeleteLichSuPhanCongMauChoKhoaAsync(LichSuPhanCongMauChoKhoa LichSuPhanCongMauChoKhoa);
    }
}
