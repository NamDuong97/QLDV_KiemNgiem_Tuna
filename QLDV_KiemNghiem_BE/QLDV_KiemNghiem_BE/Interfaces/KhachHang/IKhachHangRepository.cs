using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IKhachHangRepository
    {
        Task<PagedList<KhachHang>> GetKhachHangsAllAsync(KhachHangParam param, bool tracking);
        Task<KhachHang?> FindKhachHangAsync(string maKhachHang);
        Task<KhachHang?> GetKhachHangByTokenAsync(string token);
        Task<KhachHang?> GetKhacHangByEmailAsync(string email, bool tracking);
        Task<KhachHang?> CheckExistsEmailAsync(string email, bool tracking);
        void CreateKhachHangAsync(KhachHang KhachHang);
        void UpdateKhachHangAsync(KhachHang KhachHang);
        void DeleteKhachHangAsync(KhachHang KhachHang);
    }
}
