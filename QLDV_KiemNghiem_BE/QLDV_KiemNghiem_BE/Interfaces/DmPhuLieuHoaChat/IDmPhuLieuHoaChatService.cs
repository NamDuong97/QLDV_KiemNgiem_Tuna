using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDmPhuLieuHoaChatService
    {
        Task<IEnumerable<DmPhuLieuHoaChatDto>> GetDmPhuLieuHoaChatAllAsync();
        Task<DmPhuLieuHoaChatDto?> FindDmPhuLieuHoaChatAsync(string id);

        Task<bool> CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChatDto mau);

        Task<bool> UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChatDto mau);
        Task<bool> DeleteDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc);
    }
}
