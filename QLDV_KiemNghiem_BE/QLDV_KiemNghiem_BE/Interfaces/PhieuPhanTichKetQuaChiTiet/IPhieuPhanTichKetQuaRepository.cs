using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuPhanTichKetQuaChiTietRepository
    {
        Task<IEnumerable<PhieuPhanTichKetQuaChiTiet>> GetPhieuPhanTichKetQuaChiTietsAllAsync();
        Task<PhieuPhanTichKetQuaChiTiet?> FindPhieuPhanTichKetQuaChiTietAsync(string maPhieuPhanTichKetQuaChiTiet);
        void CreatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet);
        void UpdatePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet);
        void DeletePhieuPhanTichKetQuaChiTietAsync(PhieuPhanTichKetQuaChiTiet PhieuPhanTichKetQuaChiTiet);
    }
}
