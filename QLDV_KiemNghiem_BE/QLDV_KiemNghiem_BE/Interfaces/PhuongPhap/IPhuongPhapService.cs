using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhuongPhapService
    {
        Task<IEnumerable<PhuongPhapDto>> GetPhuongPhapsAllAsync();
        Task<PhuongPhapDto?> FindPhuongPhapAsync(string maPhuongPhap);
        Task<bool> CreatePhuongPhapAsync(PhuongPhap phuongPhap);
        Task<bool> UpdatePhuongPhapAsync(PhuongPhap phuongPhap);
        Task<bool> DeletePhuongPhapAsync(PhuongPhap phuongPhap);
    }
}
