using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhuongPhapRepository
    {
        Task<IEnumerable<PhuongPhap>> GetPhuongPhapsAllAsync();
        Task<PhuongPhap?> FindPhuongPhapAsync(string maPhuongPhap);
        Task<PhuongPhap?> FindPhuongPhapByNameAsync(string tenPhuongPhap);
        void CreatePhuongPhapAsync(PhuongPhap phuongPhap);
        void UpdatePhuongPhapAsync(PhuongPhap phuongPhap);
        void DeletePhuongPhapAsync(PhuongPhap phuongPhap);
    }
}
