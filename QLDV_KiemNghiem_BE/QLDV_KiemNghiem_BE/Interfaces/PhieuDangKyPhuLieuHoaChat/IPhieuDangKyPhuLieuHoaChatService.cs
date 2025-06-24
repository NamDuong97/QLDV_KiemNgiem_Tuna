using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDangKyPhuLieuHoaChatService
    {
        Task<IEnumerable<PhieuDangKyPhuLieuHoaChat>> GetPhieuDangKyPhuLieuHoaChatAllAsync();
        Task<List<PhieuDangKyPhuLieuHoaChatDto>?> GetPhieuDangKyPhuLieuHoaChatByPhieuDangKyAsync(string maPhieuDangKy);
        Task<ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>> CreatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChatDto plhc, string user);

        Task<ResponseModel1<PhieuDangKyPhuLieuHoaChatDto>> UpdatePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChatDto plhc, string user);
        Task<bool> DeletePhieuDangKyPhuLieuHoaChatAsync(PhieuDangKyPhuLieuHoaChat plhc);
    }
}
