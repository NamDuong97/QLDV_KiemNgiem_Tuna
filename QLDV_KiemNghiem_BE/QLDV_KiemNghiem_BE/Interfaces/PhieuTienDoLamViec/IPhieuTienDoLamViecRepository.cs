
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuTienDoLamViecRepository
    {
        Task<IEnumerable<PhieuTienDoLamViec>> GetPhieuTienDoLamViecsAllAsync();
        Task<PhieuTienDoLamViec?> FindPhieuTienDoLamViecAsync(string maPhieuTienDoLamViec);
        void CreatePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec);
        void UpdatePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec);
        void DeletePhieuTienDoLamViecAsync(PhieuTienDoLamViec PhieuTienDoLamViec);
    }
}
