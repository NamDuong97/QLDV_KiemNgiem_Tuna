using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IMauRepository
    {
        Task<IEnumerable<Mau>> GetMauAllAsync();
        Task<Mau> GetMauAsync(string maMau);
        void CreateMauAsync(Mau mau);
        void UpdateMauAsync(Mau mau);
        void DeleteMauAsync(Mau mau);
    }
}
