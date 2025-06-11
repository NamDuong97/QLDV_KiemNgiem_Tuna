using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuTienDoLamViecService
    {
        Task<IEnumerable<PhieuTienDoLamViecDto>> GetPhieuTienDoLamViecsAllAsync();
        Task<PhieuTienDoLamViecDto?> FindPhieuTienDoLamViecAsync(string maPhieuTienDoLamViec);
        Task<ResponseModel1<PhieuTienDoLamViecDto>> CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViecDto PhieuTienDoLamViecDto);
        Task<ResponseModel1<PhieuTienDoLamViecDto>> UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViecDto PhieuTienDoLamViecDto);
        Task<bool> DeletePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec);
    }
}
