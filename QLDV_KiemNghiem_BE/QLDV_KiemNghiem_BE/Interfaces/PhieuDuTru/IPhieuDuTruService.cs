using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDuTruService
    {
        Task<IEnumerable<PhieuDuTruDto>> GetPhieuDuTrusAllAsync();
        Task<PhieuDuTruDto?> FindPhieuDuTruAsync(string maPhieuDuTru);
        Task<ResponseModel1<PhieuDuTruDto>> CreatePhieuDuTruAsync(PhieuDuTruRequestCreateDto PhieuDuTruDto, string user, string userId);
        Task<ResponseModel1<PhieuDuTruDto>> UpdatePhieuDuTruAsync(PhieuDuTruRequestUpdateDto PhieuDuTruDto, string user, string userId);
        Task<ResponseModel1<PhieuDuTruDto>> DeletePhieuDuTruAsync(string maPhieuDuTru, string user, string userId);
    }
}
