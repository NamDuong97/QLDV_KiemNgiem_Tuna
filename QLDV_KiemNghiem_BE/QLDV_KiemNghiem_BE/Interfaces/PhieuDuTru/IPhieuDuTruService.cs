using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDuTruService
    {
        Task<IEnumerable<PhieuDuTruDto>> GetPhieuDuTrusAllAsync();
        Task<PhieuDuTruDto?> FindPhieuDuTruAsync(string maPhieuDuTru);
        Task<ResponseModel1<PhieuDuTruDto>> CreatePhieuDuTruAsync(PhieuDuTruDto PhieuDuTruDto);
        Task<ResponseModel1<PhieuDuTruDto>> UpdatePhieuDuTruAsync(PhieuDuTruDto PhieuDuTruDto);
        Task<bool> DeletePhieuDuTruAsync(PhieuDuTru PhieuDuTru);
    }
}
