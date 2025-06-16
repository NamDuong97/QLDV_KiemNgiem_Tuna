using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface ILoaiMauService
    {
        Task<IEnumerable<LoaiMauDto>> GetLoaiMausAllAsync();
        Task<LoaiMauDto?> FindLoaiMauAsync(string maLoaiMau);
        Task<ResponseModel1<LoaiMauDto>> CreateLoaiMauAsync(LoaiMauRequestCreateDto LoaiMau, string user);

        Task<ResponseModel1<LoaiMauDto>> UpdateLoaiMauAsync(LoaiMauRequestUpdateDto LoaiMau, string user);
        Task<bool> DeleteLoaiMauAsync(string maLoaiMau);
    }
}
