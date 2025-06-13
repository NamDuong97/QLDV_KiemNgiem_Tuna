using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IKhachHangService
    {
        Task<(IEnumerable<KhachHangReturnDto> datas, Pagination pagi)> GetKhachHangsAllAsync(KhachHangParam param, bool tracking);
        Task<KhachHangDto?> FindKhachHangAsync(string maKhachHang);
        Task<KhachHangDto?> VerifyKhachHangByTokenAsync(string token);
        Task<ResponseModel1<string>> LoginKhachHangAsync(LoginDto login);
        Task<ResponseModel1<KhachHangDto>> CreateKhachHangAsync(KhachHangDto KhachHangDto);
        Task<ResponseModel1<KhachHangDto>> UpdateKhachHangAsync(KhachHangDto KhachHangDto);
        Task<bool> DeleteKhachHangAsync(KhachHang KhachHang);
    }
}
