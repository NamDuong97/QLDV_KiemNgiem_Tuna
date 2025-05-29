using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ILoaiDichVuService
    {
        Task<IEnumerable<LoaiDichVuDto>> GetLoaiDichVusAllAsync();
        Task<LoaiDichVuDto?> FindLoaiDichVuAsync(string maLoaiDichVu);
        Task<bool> CreateLoaiDichVuAsync(LoaiDichVuDto LoaiDichVuDto);
        Task<bool> UpdateLoaiDichVuAsync(LoaiDichVuDto LoaiDichVuDto);
        Task<bool> DeleteLoaiDichVuAsync(LoaiDichVu LoaiDichVu);
    }
}
