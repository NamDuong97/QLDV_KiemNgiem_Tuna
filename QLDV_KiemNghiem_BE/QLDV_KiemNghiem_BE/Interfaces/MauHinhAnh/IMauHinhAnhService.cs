using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IMauHinhAnhService
    {
        Task<IEnumerable<MauHinhAnhDto>> GetMauHinhAnhsAllAsync();
        Task<MauHinhAnhDto?> FindMauHinhAnhAsync(string maMauHinhAnh);
        Task<bool> CreateMauHinhAnhAsync(MauHinhAnh MauHinhAnh);
        Task<bool> UpdateMauHinhAnhAsync(MauHinhAnh MauHinhAnh);
        Task<bool> DeleteMauHinhAnhAsync(MauHinhAnh MauHinhAnh);
    }
}
