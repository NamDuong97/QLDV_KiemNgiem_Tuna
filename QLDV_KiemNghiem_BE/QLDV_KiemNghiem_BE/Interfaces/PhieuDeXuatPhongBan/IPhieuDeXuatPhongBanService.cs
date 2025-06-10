using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuDeXuatPhongBanService
    {
        Task<IEnumerable<PhieuDeXuatPhongBanDto>> GetPhieuDeXuatPhongBansAllAsync();
        Task<PhieuDeXuatPhongBanDto?> FindPhieuDeXuatPhongBanAsync(string maPhieuDeXuatPhongBan);
        Task<ResponseModel1<PhieuDeXuatPhongBanDto>> CreatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto PhieuDeXuatPhongBanDto);
        Task<ResponseModel1<PhieuDeXuatPhongBanDto>> UpdatePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBanDto PhieuDeXuatPhongBanDto);
        Task<bool> DeletePhieuDeXuatPhongBanAsync(PhieuDeXuatPhongBan PhieuDeXuatPhongBan);
    }
}
