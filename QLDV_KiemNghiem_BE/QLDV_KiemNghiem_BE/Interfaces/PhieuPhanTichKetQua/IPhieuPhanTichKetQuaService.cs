using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuPhanTichKetQuaService
    {
        Task<IEnumerable<PhieuPhanTichKetQuaDto>> GetPhieuPhanTichKetQuasAllAsync();
        Task<PhieuPhanTichKetQuaDto?> FindPhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto PhieuPhanTichKetQuaDto);
        Task<ResponseModel1<PhieuPhanTichKetQuaDto>> UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQuaDto PhieuPhanTichKetQuaDto);
        Task<bool> DeletePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua);
    }
}
