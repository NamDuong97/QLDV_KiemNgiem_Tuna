using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChucVuService
    {
        Task<IEnumerable<ChucVuDto>> GetChucVusAllAsync();
        Task<ChucVuDto?> FindChucVuAsync(string maChucVu);
        Task<bool> CreateChucVuAsync(ChucVu ChucVu);
        Task<bool> UpdateChucVuAsync(ChucVu ChucVu);
        Task<bool> DeleteChucVuAsync(ChucVu ChucVu);
    }
}
