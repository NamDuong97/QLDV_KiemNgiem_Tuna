using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTieuService
    {
        Task<IEnumerable<ChiTieuDto>> GetChiTieusAllAsync();
        Task<ChiTieuDto?> FindChiTieuAsync(string maChiTieu);
        Task<bool> CreateChiTieuAsync(ChiTieu chiTieu);
        Task<bool> UpdateChiTieuAsync(ChiTieu chiTieu);
        Task<bool> DeleteChiTieuAsync(ChiTieu chiTieu);
    }
}
