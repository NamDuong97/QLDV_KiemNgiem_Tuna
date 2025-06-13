
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDuTruRepository
    {
        Task<IEnumerable<PhieuDuTru>> GetPhieuDuTrusAllAsync();
        Task<PhieuDuTru?> FindPhieuDuTruAsync(string maPhieuDuTru);
        void CreatePhieuDuTruAsync(PhieuDuTru PhieuDuTru);
        void UpdatePhieuDuTruAsync(PhieuDuTru PhieuDuTru);
        void DeletePhieuDuTruAsync(PhieuDuTru PhieuDuTru);
    }
}
