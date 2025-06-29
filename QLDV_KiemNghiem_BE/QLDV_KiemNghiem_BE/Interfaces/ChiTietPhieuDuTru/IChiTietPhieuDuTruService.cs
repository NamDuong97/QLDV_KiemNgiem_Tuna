using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietPhieuDuTruService
    {
        Task<IEnumerable<ChiTietPhieuDuTruDto>> GetChiTietPhieuDuTrusAllAsync();
        Task<ChiTietPhieuDuTruDto?> FindChiTietPhieuDuTruAsync(string maChiTietPhieuDuTru);
        Task<ResponseModel1<ChiTietPhieuDuTruDto>> CreateChiTietPhieuDuTruAsync(ChiTietPhieuDuTruRequestCreateDto ChiTietPhieuDuTruDto);
        Task<ResponseModel1<ChiTietPhieuDuTruDto>> UpdateChiTietPhieuDuTruAsync(ChiTietPhieuDuTruRequestUpdateDto ChiTietPhieuDuTruDto);
        Task<bool> DeleteChiTietPhieuDuTruAsync(string maChiTietPhieuDuTru);
    }
}
