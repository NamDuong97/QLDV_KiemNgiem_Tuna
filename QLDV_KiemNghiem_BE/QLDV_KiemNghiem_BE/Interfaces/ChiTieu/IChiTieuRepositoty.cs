using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTieuRepositoty
    {
        Task<IEnumerable<ChiTieu>> GetChiTieusAllAsync();
        Task<ChiTieu?> FindChiTieuAsync(string maChiTieu);
        Task<ChiTieu?> FindChiTieuByNameAsync(string tenChiTieu);
        void CreateChiTieuAsync(ChiTieu chiTieu);
        void UpdateChiTieuAsync(ChiTieu chiTieu);
        void DeleteChiTieuAsync(ChiTieu chiTieu);
    }
}
