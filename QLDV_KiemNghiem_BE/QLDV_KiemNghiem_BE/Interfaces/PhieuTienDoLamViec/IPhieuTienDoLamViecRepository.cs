
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuTienDoLamViecRepository
    {
        Task<PagedList<PhieuTienDoLamViecProcedure>> GetPhieuTienDoLamViecAllAsync(PhieuTienDoLamViecParam param);
        Task<PhieuTienDoLamViecProcedure?> FindPhieuTienDoLamViecShowAsync(string maPhieuTienDo);
        Task<PhieuTienDoLamViec?> FindPhieuTienDoLamViecAsync(string maPhieuTienDoLamViec, bool track);
        void CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec);
        void UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec);
        void DeletePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec);
    }
}
