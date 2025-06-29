using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IPhieuLuuMauService
    {
        Task<IEnumerable<PhieuLuuMauDto>> GetPhieuLuuMausAllAsync();
        Task<PhieuLuuMauDto?> FindPhieuLuuMauAsync(string maPhieuLuuMau);
        Task<ResponseModel1<PhieuLuuMauDto>> CreatePhieuLuuMauAsync(PhieuLuuMauRequestCreateDto PhieuLuuMauDto, string user);
        Task<ResponseModel1<PhieuLuuMauDto>> UpdatePhieuLuuMauAsync(PhieuLuuMauRequestUpdateDto PhieuLuuMauDto, string user);
        Task<ResponseModel1<PhieuLuuMauDto>> DeletePhieuLuuMauAsync(string maPhieuLuuMau, string user, bool isDel);
    }
}
