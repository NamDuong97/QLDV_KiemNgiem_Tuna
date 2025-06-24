using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyPhuLieuHoaChatService
    {
        Task<(IEnumerable<PhieuDangKyPhuLieuHoaChatDto> datas, Pagination pagi)> GetPhieuDangKyPhuLieuHoaChatAllAsync(PhieuDangKyPhuLieuHoaChatParam param);
        Task<List<PhieuDangKyPhuLieuHoaChatDto>?> GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(string maPhieuDangKy);
        Task<ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>> CreatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChatDto plhc, string user);
        Task<PhieuDangKyPhuLieuHoaChatDto?> GetPhieuDangKyPhuLieuHoaChatAsync(string maPDKPLHC);
        Task<ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>> UpdatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChatDto plhc, string user);
        Task<bool> DeletePhieuDangKyPhuLieuHoaChatAsync(string maPhieuDangKyPhuLieuHoaChat, string user);
    }
}
