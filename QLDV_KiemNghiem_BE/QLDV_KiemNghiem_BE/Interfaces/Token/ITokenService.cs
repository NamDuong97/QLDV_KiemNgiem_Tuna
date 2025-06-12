using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ITokenService
    {
        string GenerateJwtToken(TokenParam param);
    }
}
