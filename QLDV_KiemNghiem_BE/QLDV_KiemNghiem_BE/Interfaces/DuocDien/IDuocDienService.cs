using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDuocDienService
    {
        Task<IEnumerable<DuocDienDto>> GetDuocDiensAllAsync();
        Task<DuocDienDto?> FindDuocDienAsync(string maDuocDien);
        Task<bool> CreateDuocDienAsync(DuocDien DuocDien);
        Task<bool> UpdateDuocDienAsync(DuocDien DuocDien);
        Task<bool> DeleteDuocDienAsync(DuocDien DuocDien);
    }
}
