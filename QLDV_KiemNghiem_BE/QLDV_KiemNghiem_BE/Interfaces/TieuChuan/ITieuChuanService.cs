using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ITieuChuanService
    {
        Task<IEnumerable<TieuChuanDto>> GetTieuChuansAllAsync();
        Task<TieuChuanDto?> FindTieuChuanAsync(string maTieuChuan);
        Task<ResponseModel1<TieuChuanDto>> CreateTieuChuanAsync(TieuChuanRequestCreateDto tieuChuanDto, string user);
        Task<ResponseModel1<TieuChuanDto>> UpdateTieuChuanAsync(TieuChuanRequestUpdateDto tieuChuanDto, string user);
        Task<bool> DeleteTieuChuanAsync(string maTieuChuan);
    }
}
