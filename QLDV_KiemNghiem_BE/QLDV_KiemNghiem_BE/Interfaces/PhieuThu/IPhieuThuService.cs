using QLDV_KiemNghiem_BE.DTO.Parameter;
using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuThuService
    {
        Task<IEnumerable<PhieuThuDto>> GetPhieuThusAllAsync();
        Task<PhieuThuDto?> FindPhieuThuAsync(string maPhieuThu);
        Task<ResponseModel1<PhieuThuDto>> CreatePhieuThuAsync(PhieuThuDto PhieuThuDto);
        Task<ResponseModel1<PhieuThuDto>> UpdatePhieuThuAsync(PhieuThuDto PhieuThuDto);
        Task<bool> DeletePhieuThuAsync(PhieuThu PhieuThu);
    }
}
