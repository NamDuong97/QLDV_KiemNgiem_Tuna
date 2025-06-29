using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuPhanTichKetQuaService
    {
        Task<IEnumerable<PhieuPhanTichKetQuaDto>> GetPhieuPhanTichKetQuasAllAsync();
        Task<PhieuPhanTichKetQuaDto?> FindPhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaRequestCreateDto PhieuPhanTichKetQuaDto, string user, string userId);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaRequestUpdateDto PhieuPhanTichKetQuaDto, string user, string userId);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> ReviewPhieuPhanTichKetQuaByLDP(string maPhieuPhanTichKetQua, string user, string userId);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> ReviewPhieuPhanTichKetQuaByBLD(string maPhieuPhanTichKetQua, string user, string userId);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> DeletePhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua, string user, bool isDel);
    }
}
