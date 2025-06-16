using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhuongPhapService
    {
        Task<IEnumerable<PhuongPhapDto>> GetPhuongPhapsAllAsync();
        Task<PhuongPhapDto?> FindPhuongPhapAsync(string maPhuongPhap);
        Task<bool> CreatePhuongPhapAsync(PhuongPhapDto phuongPhapDto);
        Task<bool> UpdatePhuongPhapAsync(PhuongPhapDto phuongPhapDto);
        Task<bool> DeletePhuongPhapAsync(PhuongPhap phuongPhap);
    }
}
