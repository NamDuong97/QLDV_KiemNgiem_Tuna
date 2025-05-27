using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IMauHinhAnhRepository
    {
        Task<IEnumerable<MauHinhAnh>> GetMauHinhAnhsAllAsync();
        Task<MauHinhAnh?> FindMauHinhAnhAsync(string maMauHinhAnh);
        void CreateMauHinhAnhAsync(MauHinhAnh MauHinhAnh);
        void UpdateMauHinhAnhAsync(MauHinhAnh MauHinhAnh);
        void DeleteMauHinhAnhAsync(MauHinhAnh MauHinhAnh);
    }
}
