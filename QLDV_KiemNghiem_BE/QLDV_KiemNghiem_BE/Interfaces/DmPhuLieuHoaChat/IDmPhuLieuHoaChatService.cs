using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDmPhuLieuHoaChatService
    {
        Task<IEnumerable<DmPhuLieuHoaChat>> GetDmPhuLieuHoaChatAllAsync();
        Task<bool> CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat mau);

        Task<bool> UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat mau);
        Task<bool> DeleteDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc);
    }
}
