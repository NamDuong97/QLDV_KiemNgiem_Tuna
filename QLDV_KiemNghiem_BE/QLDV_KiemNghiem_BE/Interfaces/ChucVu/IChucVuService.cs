using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChucVuService
    {
        Task<IEnumerable<ChucVuDto>> GetChucVusAllAsync();
        Task<ResponseModel1<ChucVuDto?>> FindChucVuAsync(string maChucVu);
        Task<ResponseModel1<ChucVuDto>> CreateChucVuAsync(ChucVuRequestCreateDto ChucVu, string user);
        Task<ResponseModel1<ChucVuDto>> UpdateChucVuAsync(ChucVuRequestUpdateDto ChucVu, string user);
        Task<bool> DeleteChucVuAsync(string maChucVu);
    }
}
