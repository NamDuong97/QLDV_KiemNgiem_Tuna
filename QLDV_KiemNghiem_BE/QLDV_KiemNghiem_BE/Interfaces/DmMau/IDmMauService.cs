using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDmMauService
    {
        Task<IEnumerable<DmMauDto>> GetDmMausAllAsync();
        Task<DmMauDto?> FindDmMauAsync(string maDmMau);
        Task<bool> CreateDmMauAsync(DmMauDto DmMauDto);
        Task<bool> UpdateDmMauAsync(DmMauDto DmMauDto);
        Task<bool> DeleteDmMauAsync(DmMau DmMau);
    }
}
