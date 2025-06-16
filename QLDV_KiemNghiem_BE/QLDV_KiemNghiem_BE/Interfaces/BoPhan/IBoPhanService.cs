using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IBoPhanService
    {
        Task<IEnumerable<BoPhanDto>> GetBoPhansAllAsync();
        Task<BoPhanDto?> FindBoPhanAsync(string maBoPhan);
        Task<ResponseModel1<BoPhanDto>> CreateBoPhanAsync(BoPhanRequestCreateDto BoPhan, string user);
        Task<ResponseModel1<BoPhanDto>> UpdateBoPhanAsync(BoPhanRequestUpdateDto BoPhan, string user);
        Task<bool> DeleteBoPhanAsync(string maBoPhan);
    }
}
