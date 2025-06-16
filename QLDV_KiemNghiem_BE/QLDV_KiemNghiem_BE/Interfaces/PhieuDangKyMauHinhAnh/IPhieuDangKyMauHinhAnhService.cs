using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyMauHinhAnhService
    {
        Task<IEnumerable<PhieuDangKyMauHinhAnhDto>> GetPhieuDangKyMauHinhAnhsAllAsync();
        Task<PhieuDangKyMauHinhAnhDto?> FindPhieuDangKyMauHinhAnhAsync(string maMauHinhAnh);
        Task<bool> CreatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnhDto MauHinhAnh);
        Task<bool> UpdatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnhDto MauHinhAnh);
        Task<bool> DeletePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh MauHinhAnh);
    }
}
