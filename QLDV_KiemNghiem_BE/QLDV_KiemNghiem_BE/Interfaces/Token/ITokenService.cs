using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(TokenParam param);
        string GenerateRefreshToken();
        Task<ResponseModel1<TokenDto>> RefreshToken(TokenDto tokenDto);
    }
}
