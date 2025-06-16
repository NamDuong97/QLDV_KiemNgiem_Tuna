using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IKhachHangService
    {
        Task<(IEnumerable<KhachHangReturnDto> datas, Pagination pagi)> GetKhachHangsAllAsync(KhachHangParam param, bool tracking);
        Task<KhachHangDto?> FindKhachHangByNhanVienAsync(string maKhachHang);
        Task<ResponseModel1<KhachHangReturnClientDto?>> FindKhachHangBySeflAsync(string maKhachHang);
        Task<KhachHangDto?> VerifyKhachHangByTokenAsync(string token);
        Task<ResponseModel1<TokenDto>> GetRefreshTokenForKhachHang(TokenDto token);
        Task<ResponseModel1<string>> ForgetPasswordAsync(string email);
        Task<ResponseModel1<KhachHangDto>> ChangePasswordAsync(ResetPasswordRequestDto pass);
        Task<LoginResponse> LoginKhachHangAsync(LoginDto login);
        Task<ResponseModel1<KhachHangDto>> CreateKhachHangAsync(KhachHangDto KhachHangDto);
        Task<ResponseModel1<KhachHangDto>> UpdateKhachHangAsync(KhachHangRequestDto KhachHangDto, string user);
        Task<bool> DeleteKhachHangAsync(string maKhachHang, string user);
    }
}
