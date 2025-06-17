using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDeXuatPhongBanService
    {
        Task<IEnumerable<PhieuDeXuatPhongBanDto>> GetPhieuDeXuatPhongBansAllAsync();
        Task<PhieuDeXuatPhongBanDto?> FindPhieuDeXuatPhongBanAsync(string maPhieuDeXuatPhongBan);
        Task<ResponseModel1<PhieuDeXuatPhongBanDto>> CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanRequestCreateDto PhieuDeXuatPhongBanDto, string user);
        Task<ResponseModel1<PhieuDeXuatPhongBanDto>> UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanRequestUpdateDto PhieuDeXuatPhongBanDto, string user);
        Task<bool> DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
    }
}
