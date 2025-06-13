using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuThuRepository
    {
        Task<IEnumerable<PhieuThu>> GetPhieuThusAllAsync();
        Task<PhieuThu?> FindPhieuThuAsync(string maPhieuThu);
        void CreatePhieuThuAsync(PhieuThu PhieuThu);
        void UpdatePhieuThuAsync(PhieuThu PhieuThu);
        void DeletePhieuThuAsync(PhieuThu PhieuThu);
    }
}
