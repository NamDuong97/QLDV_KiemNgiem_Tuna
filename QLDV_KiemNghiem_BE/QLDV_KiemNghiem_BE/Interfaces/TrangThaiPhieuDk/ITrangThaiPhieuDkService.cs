using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ITrangThaiPhieuDkService
    {
        Task<IEnumerable<TrangThaiPhieuDkDto>> GetTrangThaiPhieuDksAllAsync();
        Task<TrangThaiPhieuDkDto?> FindTrangThaiPhieuDkAsync(string maTrangThaiPhieuDk);
        Task<bool> CreateTrangThaiPhieuDkAsync(TrangThaiPhieuDkDto TrangThaiPhieuDkDto);
        Task<bool> UpdateTrangThaiPhieuDkAsync(TrangThaiPhieuDkDto TrangThaiPhieuDkDto);
        Task<bool> DeleteTrangThaiPhieuDkAsync(TrangThaiPhieuDk TrangThaiPhieuDk);
    }
}
