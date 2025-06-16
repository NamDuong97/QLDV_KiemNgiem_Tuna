using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyMauService
    {
        Task<IEnumerable<PhieuDangKyMauDto>> GetPhieuDangKyMauAllAsync();
        Task<PhieuDangKyMauDto?> GetPhieuDangKyMauAsync(string maPhieuDangKyMau);
        Task<bool> CreatePhieuDangKyMauAsync(PhieuDangKyMauDto PhieuDangKyMau);

        Task<bool> UpdatePhieuDangKyMauAsync(PhieuDangKyMauDto PhieuDangKyMau);

        Task<bool> DeletePhieuDangKyMauAsync(string maPhieuDangKyMau);
    }
}
