using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IBoPhanRepository
    {
        Task<IEnumerable<BoPhan>> GetBoPhansAllAsync();
        Task<BoPhan?> FindBoPhanAsync(string maBoPhan);
        void CreateBoPhanAsync(BoPhan BoPhan);
        void UpdateBoPhanAsync(BoPhan BoPhan);
        void DeleteBoPhanAsync(BoPhan BoPhan);
    }
}
