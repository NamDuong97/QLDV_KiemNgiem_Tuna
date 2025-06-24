using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IHoaDonThuService
    {
        Task<(IEnumerable<HoaDonThuDto> datas, Pagination pagi)> GetHoaDonThusAllAsync(HoaDonThuParam param, bool tracking);
        Task<IEnumerable<HoaDonThuDto>> GetHoaDonThuOfCustomer(string maKH);
        Task<HoaDonThuDto?> FindHoaDonThuAsync(string maHoaDonThu);
        Task<ResponseModel1<HoaDonThuDto>> CreateHoaDonThuAsync(HoaDonThuDto hoaDonThuDto, string user);
        Task<ResponseModel1<HoaDonThuDto>> CreateHoaDonThuByPhieuDangKyAsync(PhieuDangKyDto phieuDangKy, string user);
        Task<ResponseModel1<HoaDonThuDto>> UpdateHoaDonThuAsync(HoaDonThuDto HoaDonThuDto, string user);
        Task<ResponseModel1<HoaDonThuDto>> UpdateHoaDonThuByMaPhieuDangKyAsync(string maPhieuDangKy);
        Task<ResponseModel1<string>> DeleteHoaDonThuAsync(string maHoaDonThu, string user);
    }
}
