using QLDV_KiemNghiem_BE.DTO.RequestDto;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IHoaDonThuService
    {
        Task<(IEnumerable<HoaDonThuProcedureDto> datas, Pagination pagi)> GetHoaDonThusAllAsync(HoaDonThuParam param);
        Task<HoaDonThuDto?> FindHoaDonThuAsync(string maHoaDonThu);
        Task<ResponseModel1<HoaDonThuDto>> CreateHoaDonThuAsync(HoaDonThuRequestCreateDto hoaDonThuDto, string user, string userId);
        Task<ResponseModel1<HoaDonThuDto>> CreateHoaDonThuByPhieuDangKyAsync(PhieuDangKyDto phieuDangKy, string user);
        Task<ResponseModel1<HoaDonThuDto>> UpdateHoaDonThuAsync(HoaDonThuRequestUpdateDto HoaDonThuDto, string user, string userId);
        Task<ResponseModel1<HoaDonThuDto>> UpdateHoaDonThuByMaPhieuDangKyAsync(string maPhieuDangKy);
        Task<ResponseModel1<string>> DeleteHoaDonThuAsync(string maHoaDonThu, string user);
    }
}
