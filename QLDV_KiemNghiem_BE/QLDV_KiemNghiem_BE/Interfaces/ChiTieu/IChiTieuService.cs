using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTieuService
    {
        Task<IEnumerable<ChiTieuDto>> GetChiTieuAllAsync();
        Task<ChiTieuDto?> FindChiTieuAsync(string id);
        Task<ResponseModel1<ChiTieuDto>> CreateChiTieuAsync(ChiTieuRequestCreateDto chiTieu, string user);

        Task<ResponseModel1<ChiTieuDto>> UpdateChiTieuAsync(ChiTieuRequestUpdateDto chiTieu, string user);
        Task<bool> DeleteChiTieuAsync(string maChiTieu);
    }
}
