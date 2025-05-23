using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDmPhuLieuHoaChatRepository
    {
        Task<IEnumerable<DmPhuLieuHoaChat>> GetDmPhuLieuHoaChatAllAsync();
        void CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc);
        void UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc);
        void DeleteDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc);
    }
}
