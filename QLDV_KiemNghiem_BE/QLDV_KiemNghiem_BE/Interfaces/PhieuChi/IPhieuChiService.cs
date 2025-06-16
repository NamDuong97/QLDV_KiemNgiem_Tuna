using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuChiService
    {
        Task<IEnumerable<PhieuChiDto>> GetPhieuChisAllAsync();
        Task<PhieuChiDto?> FindPhieuChiAsync(string maPhieuChi);
        Task<ResponseModel1<PhieuChiDto>> CreatePhieuChiAsync(PhieuChiDto PhieuChiDto);
        Task<ResponseModel1<PhieuChiDto>> UpdatePhieuChiAsync(PhieuChiDto PhieuChiDto);
        Task<bool> DeletePhieuChiAsync(PhieuChi PhieuChi);
    }
}
