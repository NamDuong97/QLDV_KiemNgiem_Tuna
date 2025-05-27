using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IMauService
    {
        Task<IEnumerable<Mau>> GetMauAllAsync();
        Task<Mau?> GetMauAsync(string maMau);
        Task<bool> CreateMauAsync(Mau mau);

        Task<bool> UpdateMauAsync(Mau mau);

        Task<bool> DeleteMauAsync(Mau mau);
    }
}
