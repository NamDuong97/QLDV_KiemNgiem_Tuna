using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDuocDienRepository
    {
        Task<IEnumerable<DuocDien>> GetDuocDiensAllAsync();
        Task<DuocDien?> FindDuocDienAsync(string maDuocDien);
        void CreateDuocDienAsync(DuocDien DuocDien);
        void UpdateDuocDienAsync(DuocDien DuocDien);
        void DeleteDuocDienAsync(DuocDien DuocDien);
    }
}
