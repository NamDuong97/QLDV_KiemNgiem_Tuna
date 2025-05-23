using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyPhuLieuHoaChatRepository
    {
        Task<IEnumerable<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatAllAsync();
        void CreatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
        void UpdatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
        void DeletePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
    }
}
