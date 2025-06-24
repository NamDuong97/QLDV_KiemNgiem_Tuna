using QLDV_KiemNghiem_BE.Data;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyMauRepository
    {
        Task<PagedList<PhieuDangKyMauProcedure>> GetPhieuDangKyMauAllAsync(PhieuDangKyMauParam param);
        Task<PhieuDangKyMau?> GetPhieuDangKyMauAsync(string maPhieuDangKyMau);
        Task<PhieuDangKyMau?> FindPhieuDangKyMauAsync(string maPhieuDangKyMau);
        Task<PhieuDangKyMau?> FindPhieuDangKyMauByPhieuDangKyAndMaDmMauAsync(string maPhieuDangKy, string maDmMau, bool c);
        Task ProcessUpdateStatusObjecRelative(string maMau, int TypeCancel);
        Task<int> CheckPhanCongAllMauInPDK(string maId, string maPhieuDangKy);
        Task CreatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau);
        void UpdatePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau);
        void DeletePhieuDangKyMauAsync(PhieuDangKyMau PhieuDangKyMau);
        Task<PhieuDangKyMau?> CheckExistPhieuDangKyMauAsync(string phieuDangKyMau, string phieuDangKy, bool checking);
    }
}
