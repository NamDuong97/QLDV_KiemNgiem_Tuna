using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ITrangThaiPhieuDkRepository
    {
        Task<IEnumerable<TrangThaiPhieuDk>> GetTrangThaiPhieuDksAllAsync();
        Task<TrangThaiPhieuDk?> FindTrangThaiPhieuDkAsync(string maTrangThaiPhieuDk);
        void CreateTrangThaiPhieuDkAsync(TrangThaiPhieuDk TrangThaiPhieuDk);
        void UpdateTrangThaiPhieuDkAsync(TrangThaiPhieuDk TrangThaiPhieuDk);
        void DeleteTrangThaiPhieuDkAsync(TrangThaiPhieuDk TrangThaiPhieuDk);
    }
}
