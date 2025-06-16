using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IKhoaService
    {
        Task<IEnumerable<KhoaDto>> GetKhoasAllAsync();
        Task<KhoaDto?> FindKhoaAsync(string maKhoa);
        Task<bool> CreateKhoaAsync(KhoaDto Khoa);
        Task<bool> UpdateKhoaAsync(KhoaDto Khoa);
        Task<bool> DeleteKhoaAsync(Khoa Khoa);
    }
}
