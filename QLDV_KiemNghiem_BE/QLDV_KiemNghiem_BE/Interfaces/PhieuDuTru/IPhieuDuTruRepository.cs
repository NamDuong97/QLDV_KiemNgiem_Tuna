
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDuTruRepository
    {
        Task<PagedList<PhieuDuTruProcedure>> GetPhieuDuTruAllAsync(PhieuDuTruParam param);
        Task<PhieuDuTru?> FindPhieuDuTruAsync(string maPhieuDuTru, bool track);
        Task<PhieuDuTruProcedure?> FindPhieuDuTruShowAsync(string maPhieuDuTru);
        void CreatePhieuDuTruAsync(PhieuDuTru PhieuDuTru);
        void UpdatePhieuDuTruAsync(PhieuDuTru PhieuDuTru);
        void DeletePhieuDuTruAsync(PhieuDuTru PhieuDuTru);
    }
}
