using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IChiTietPhieuDeXuatPhongBanService
    {
        Task<IEnumerable<ChiTietPhieuDeXuatPhongBanDto>> GetChiTietPhieuDeXuatPhongBansAllAsync();
        Task<ChiTietPhieuDeXuatPhongBanDto?> FindChiTietPhieuDeXuatPhongBanAsync(string maChiTietPhieuDeXuatPhongBan);
        Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> CreateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto);
        Task<ResponseModel1<ChiTietPhieuDeXuatPhongBanDto>> UpdateChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBanDto ChiTietPhieuDeXuatPhongBanDto);
        Task<bool> DeleteChiTietPhieuDeXuatPhongBanAsync(ChiTietPhieuDeXuatPhongBan ChiTietPhieuDeXuatPhongBan);
    }
}
