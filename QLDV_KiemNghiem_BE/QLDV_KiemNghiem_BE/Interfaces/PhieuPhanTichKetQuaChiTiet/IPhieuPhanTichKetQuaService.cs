using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuPhanTichKetQuaChiTietService
    {
        Task<IEnumerable<PhieuPhanTichKetQuaChiTietDto>> GetPhieuPhanTichKetQuaChiTietsAllAsync();
        Task<PhieuPhanTichKetQuaChiTietDto?> FindPhieuPhanTichKetQuaChiTietAsync(string maPhieuPhanTichKetQuaChiTiet);
        Task<ResponseModel1<PhieuPhanTichKetQuaChiTietDto>> CreatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDto PhieuPhanTichKetQuaChiTietDto);
        Task<ResponseModel1<PhieuPhanTichKetQuaChiTietDto>> UpdatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTietDto PhieuPhanTichKetQuaChiTietDto);
        Task<bool> DeletePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet);
    }
}
