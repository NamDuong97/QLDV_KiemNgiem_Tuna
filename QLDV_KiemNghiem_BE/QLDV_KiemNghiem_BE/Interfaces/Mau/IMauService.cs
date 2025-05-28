using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IMauService
    {
        Task<IEnumerable<MauDto>> GetMauAllAsync();
        Task<MauDto?> GetMauAsync(string maMau);
        Task<bool> CreateMauAsync(MauDto mau);

        Task<bool> UpdateMauAsync(MauDto mau);

        Task<bool> DeleteMauAsync(string maMau);
    }
}
