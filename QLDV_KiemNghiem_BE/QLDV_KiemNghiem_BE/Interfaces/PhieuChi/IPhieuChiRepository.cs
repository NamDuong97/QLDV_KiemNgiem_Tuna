using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuChiRepository
    {
        Task<IEnumerable<PhieuChi>> GetPhieuChisAllAsync();
        Task<PhieuChi?> FindPhieuChiAsync(string maPhieuChi);
        void CreatePhieuChiAsync(PhieuChi PhieuChi);
        void UpdatePhieuChiAsync(PhieuChi PhieuChi);
        void DeletePhieuChiAsync(PhieuChi PhieuChi);
    }
}
