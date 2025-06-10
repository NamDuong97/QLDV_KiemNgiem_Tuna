
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuPhanTichKetQuaRepository
    {
        Task<IEnumerable<PhieuPhanTichKetQua>> GetPhieuPhanTichKetQuasAllAsync();
        Task<PhieuPhanTichKetQua?> FindPhieuPhanTichKetQuaAsync(string maPhieuPhanTichKetQua);
        void CreatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua);
        void UpdatePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua);
        void DeletePhieuPhanTichKetQuaAsync(PhieuPhanTichKetQua PhieuPhanTichKetQua);
    }
}
