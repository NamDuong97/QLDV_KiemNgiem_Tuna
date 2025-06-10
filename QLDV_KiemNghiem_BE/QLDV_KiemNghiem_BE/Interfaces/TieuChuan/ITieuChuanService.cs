using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ITieuChuanService
    {
        Task<IEnumerable<TieuChuanDto>> GetTieuChuansAllAsync();
        Task<TieuChuanDto?> FindTieuChuanAsync(string maTieuChuan);
        Task<ResponseModel1<TieuChuanDto>> CreateTieuChuanAsync(TieuChuanDto tieuChuanDto);
        Task<ResponseModel1<TieuChuanDto>> UpdateTieuChuanAsync(TieuChuanDto tieuChuanDto);
        Task<bool> DeleteTieuChuanAsync(TieuChuan tieuChuan);
    }
}
