using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.Shared;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface INhanVienService
    {
        Task<(IEnumerable<NhanVienDto> datas, Pagination pagi)> GetNhanViensAllAsync(NhanVienParam nhanVienParam, bool tracking);
        Task<NhanVienDto?> FindNhanVienAsync(string maNhanVien);
        Task<LoginResponse> LoginNhanVienAsync(LoginDto login);
        Task<ResponseModel1<TokenDto>> GetRefreshTokenForNhanVien(TokenDto token);
        Task<ResponseModel1<NhanVienDto>> CreateNhanVienAsync(NhanVienDto NhanVienDto);
        Task<ResponseModel1<NhanVienDto>> UpdateNhanVienAsync(NhanVienDto NhanVienDto);
        Task<bool> DeleteNhanVienAsync(NhanVien NhanVien);
    }
}
