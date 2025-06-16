using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhuongPhapService
    {
        Task<IEnumerable<PhuongPhapDto>> GetPhuongPhapsAllAsync();
        Task<PhuongPhapDto?> FindPhuongPhapAsync(string maPhuongPhap);
        Task<ResponseModel1<PhuongPhapDto>> CreatePhuongPhapAsync(PhuongPhapRequestCreateDto PhuongPhap, string user);

        Task<ResponseModel1<PhuongPhapDto>> UpdatePhuongPhapAsync(PhuongPhapRequestUpdateDto PhuongPhap, string user);
        Task<bool> DeletePhuongPhapAsync(string maPhuongPhap);
    }
}
