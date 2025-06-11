using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuLuuMauService
    {
        Task<IEnumerable<PhieuLuuMauDto>> GetPhieuLuuMausAllAsync();
        Task<PhieuLuuMauDto?> FindPhieuLuuMauAsync(string maPhieuLuuMau);
        Task<ResponseModel1<PhieuLuuMauDto>> CreatePhieuLuuMauAsync(PhieuLuuMauDto PhieuLuuMauDto);
        Task<ResponseModel1<PhieuLuuMauDto>> UpdatePhieuLuuMauAsync(PhieuLuuMauDto PhieuLuuMauDto);
        Task<bool> DeletePhieuLuuMauAsync(PhieuLuuMau PhieuLuuMau);
    }
}
