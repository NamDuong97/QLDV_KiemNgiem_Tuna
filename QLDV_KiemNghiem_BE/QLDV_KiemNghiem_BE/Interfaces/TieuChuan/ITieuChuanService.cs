using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ITieuChuanService
    {
        Task<IEnumerable<TieuChuanDto>> GetTieuChuansAllAsync();
        Task<TieuChuanDto?> FindTieuChuanAsync(string maTieuChuan);
        Task<bool> CreateTieuChuanAsync(TieuChuan tieuChuan);
        Task<bool> UpdateTieuChuanAsync(TieuChuan tieuChuan);
        Task<bool> DeleteTieuChuanAsync(TieuChuan tieuChuan);
    }
}
