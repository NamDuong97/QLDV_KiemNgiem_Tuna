using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDmPhuLieuHoaChatRepository
    {
        Task<IEnumerable<DmPhuLieuHoaChat>> GetDmPhuLieuHoaChatAllAsync();
        Task<DmPhuLieuHoaChat?> FindDmPhuLieuHoaChatAsync(string id);
        Task<DmPhuLieuHoaChat?> FindDmPhuLieuHoaChatByNameAsync(string dmPLHC);
        void CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc);
        void UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc);
        void DeleteDmPhuLieuHoaChatAsync(DmPhuLieuHoaChat plhc);
    }
}
