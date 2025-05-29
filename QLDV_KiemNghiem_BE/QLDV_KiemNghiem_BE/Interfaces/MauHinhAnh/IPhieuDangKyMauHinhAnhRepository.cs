using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyMauHinhAnhRepository
    {
        Task<IEnumerable<PhieuDangKyMauHinhAnh>> GetPhieuDangKyMauHinhAnhsAllAsync();
        Task<PhieuDangKyMauHinhAnh?> FindPhieuDangKyMauHinhAnhAsync(string maPhieuDangKyMauHinhAnh);
        void CreatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh);
        void UpdatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh);
        void DeletePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh);
    }
}
