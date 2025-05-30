using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IKhoaService
    {
        Task<IEnumerable<KhoaDto>> GetKhoasAllAsync();
        Task<KhoaDto?> FindKhoaAsync(string maKhoa);
        Task<bool> CreateKhoaAsync(Khoa Khoa);
        Task<bool> UpdateKhoaAsync(Khoa Khoa);
        Task<bool> DeleteKhoaAsync(Khoa Khoa);
    }
}
