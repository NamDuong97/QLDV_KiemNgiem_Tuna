using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ILoaiMauService
    {
        Task<IEnumerable<LoaiMauDto>> GetLoaiMausAllAsync();
        Task<LoaiMauDto?> FindLoaiMauAsync(string maLoaiMau);
        Task<bool> CreateLoaiMauAsync(LoaiMauDto LoaiMauDto);
        Task<bool> UpdateLoaiMauAsync(LoaiMauDto LoaiMauDto);
        Task<bool> DeleteLoaiMauAsync(LoaiMau LoaiMau);
    }
}
