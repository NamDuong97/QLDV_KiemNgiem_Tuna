using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IBoPhanService
    {
        Task<IEnumerable<BoPhanDto>> GetBoPhansAllAsync();
        Task<BoPhanDto?> FindBoPhanAsync(string maBoPhan);
        Task<bool> CreateBoPhanAsync(BoPhanDto BoPhan);
        Task<bool> UpdateBoPhanAsync(BoPhanDto BoPhan);
        Task<bool> DeleteBoPhanAsync(BoPhan BoPhan);
    }
}
