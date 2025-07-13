using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyPhuLieuHoaChatRepository
    {
        Task<PagedList<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatAllAsync(PhieuDangKyPhuLieuHoaChatParam param);
        Task<IEnumerable<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(string maPhieuDangKy);
        Task CreatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
        Task<PhieuDangKyPhuLieuHoaChat?> FindPhieuDangKyPhuLieuHoaChatAsync(string maPDKPLHC, bool tracking);
        Task<PhieuDangKyPhuLieuHoaChat?> FindPhieuDangKyPhuLieuHoaChatBySameAsync(string mPLHC, string solo, string nhaCungCap, string Dvt, bool tracking);
        Task<PhieuDangKyPhuLieuHoaChat?> GetPhieuDangKyPhuLieuHoaChatAsync(string maPDKPLHC, bool tracking);
        void UpdatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
        void DeletePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
        Task<PhieuDangKyPhuLieuHoaChat?> CheckExistPhieuDangKyPhuLieuHoaChatAsync(string phieuDangKyPlhc, string phieuDangKy, bool tracking);
    }
}
