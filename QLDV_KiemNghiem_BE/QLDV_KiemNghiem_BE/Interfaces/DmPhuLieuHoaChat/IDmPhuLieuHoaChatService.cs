using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IDmPhuLieuHoaChatService
    {
        Task<IEnumerable<DmPhuLieuHoaChatDto>> GetDmPhuLieuHoaChatAllAsync();
        Task<DmPhuLieuHoaChatDto?> FindDmPhuLieuHoaChatAsync(string id);

        Task<ResponseModel1<DmPhuLieuHoaChatDto>> CreateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChatRequestCreateDto plhc, string user);

        Task<ResponseModel1<DmPhuLieuHoaChatDto>> UpdateDmPhuLieuHoaChatAsync(DmPhuLieuHoaChatRequestUpdateDto plhc, string user);
        Task<bool> DeleteDmPhuLieuHoaChatAsync(string maPLHC);
    }
}
