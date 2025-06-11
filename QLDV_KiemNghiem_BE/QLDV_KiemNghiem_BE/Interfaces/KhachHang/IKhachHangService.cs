using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IKhachHangService
    {
        Task<IEnumerable<KhachHangReturnDto>> GetKhachHangsAllAsync();
        Task<KhachHangDto?> FindKhachHangAsync(string maKhachHang);
        Task<KhachHangDto?> VerifyKhachHangByTokenAsync(string token);
        Task<ResponseModel1<string>> LoginAsync(LoginDto login);
        Task<ResponseModel1<KhachHangDto>> CreateKhachHangAsync(KhachHangDto KhachHangDto);
        Task<ResponseModel1<KhachHangDto>> UpdateKhachHangAsync(KhachHangDto KhachHangDto);
        Task<bool> DeleteKhachHangAsync(KhachHang KhachHang);
    }
}
