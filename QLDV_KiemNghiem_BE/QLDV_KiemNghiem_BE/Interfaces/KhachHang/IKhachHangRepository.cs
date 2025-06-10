using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IKhachHangRepository
    {
        Task<IEnumerable<KhachHang>> GetKhachHangsAllAsync();
        Task<KhachHang?> FindKhachHangAsync(string maKhachHang);
        Task<KhachHang?> GetKhachHangByTokenAsync(string token);
        Task<KhachHang?> GetKhacHangByEmailAsync(string email, bool tracking);
        Task<KhachHang?> CheckExistsEmailAsync(string email, bool tracking);
        void CreateKhachHangAsync(KhachHang KhachHang);
        void UpdateKhachHangAsync(KhachHang KhachHang);
        void DeleteKhachHangAsync(KhachHang KhachHang);
    }
}
