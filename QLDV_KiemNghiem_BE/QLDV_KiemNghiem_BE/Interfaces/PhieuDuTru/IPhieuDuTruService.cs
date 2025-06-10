using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

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
