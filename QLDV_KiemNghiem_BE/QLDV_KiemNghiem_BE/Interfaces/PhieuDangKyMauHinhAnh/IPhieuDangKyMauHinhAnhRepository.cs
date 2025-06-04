using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyMauHinhAnhRepository
    {
        Task<IEnumerable<PhieuDangKyMauHinhAnh>> GetPhieuDangKyMauHinhAnhsAllAsync();
        Task<IEnumerable<PhieuDangKyMauHinhAnh>?> GetPhieuDangKyMauHinhAnhByMaMauAsync(string maMau, bool tracking);
        Task<PhieuDangKyMauHinhAnh?> FindPhieuDangKyMauHinhAnhAsync(string maPhieuDangKyMauHinhAnh);
        Task CreatePhieuDangKyMauHinhAnhAsync(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh);
        void UpdatePhieuDangKyMauHinhAnh(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh);
        void DeletePhieuDangKyMauHinhAnh(PhieuDangKyMauHinhAnh PhieuDangKyMauHinhAnh);
        Task<PhieuDangKyMauHinhAnh?> CheckExistPhieuDangKyMauHinhAnhAsync(string id, bool tracking);
    }
}
