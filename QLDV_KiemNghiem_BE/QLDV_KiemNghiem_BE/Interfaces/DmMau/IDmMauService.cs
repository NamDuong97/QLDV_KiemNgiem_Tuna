using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDmMauService
    {
        Task<IEnumerable<DmMauDto>> GetDmMausAllAsync();
        Task<DmMauDto?> FindDmMauAsync(string maDmMau);
        Task<ResponseModel1<DmMauDto>> CreateDmMauAsync(DmMauRequestCreateDto DmMau, string user);

        Task<ResponseModel1<DmMauDto>> UpdateDmMauAsync(DmMauRequestUpdateDto DmMau, string user);
        Task<bool> DeleteDmMauAsync(string maDmMau);
    }
}
