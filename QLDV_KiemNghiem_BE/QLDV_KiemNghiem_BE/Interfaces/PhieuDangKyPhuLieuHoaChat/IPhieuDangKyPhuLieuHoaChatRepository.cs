using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyPhuLieuHoaChatRepository
    {
        Task<IEnumerable<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatAllAsync();
        Task<IEnumerable<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(string maPhieuDangKy);
        Task CreatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
        Task<PhieuDangKyPhuLieuHoaChat?> FindPhieuDangKyPhuLieuHoaChatAsync(string maPDKPLHC, bool tracking);
        void UpdatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
        void DeletePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
        Task<PhieuDangKyPhuLieuHoaChat?> CheckExistPhieuDangKyPhuLieuHoaChatAsync(string phieuDangKyPlhc, string phieuDangKy, bool tracking);
    }
}
