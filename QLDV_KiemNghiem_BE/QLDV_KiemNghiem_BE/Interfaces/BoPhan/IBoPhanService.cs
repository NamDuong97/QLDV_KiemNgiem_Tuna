using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IBoPhanService
    {
        Task<IEnumerable<BoPhanDto>> GetBoPhansAllAsync();
        Task<BoPhanDto?> FindBoPhanAsync(string maBoPhan);
        Task<bool> CreateBoPhanAsync(BoPhan BoPhan);
        Task<bool> UpdateBoPhanAsync(BoPhan BoPhan);
        Task<bool> DeleteBoPhanAsync(BoPhan BoPhan);
    }
}
