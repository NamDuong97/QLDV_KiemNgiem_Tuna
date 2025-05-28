using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ITieuChuanService
    {
        Task<IEnumerable<TieuChuanDto>> GetTieuChuansAllAsync();
        Task<TieuChuanDto?> FindTieuChuanAsync(string maTieuChuan);
        Task<bool> CreateTieuChuanAsync(TieuChuanDto tieuChuanDto);
        Task<bool> UpdateTieuChuanAsync(TieuChuanDto tieuChuanDto);
        Task<bool> DeleteTieuChuanAsync(TieuChuan tieuChuan);
    }
}
