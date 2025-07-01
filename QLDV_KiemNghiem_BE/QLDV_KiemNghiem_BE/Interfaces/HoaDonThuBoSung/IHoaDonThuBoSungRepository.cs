
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IHoaDonThuBoSungRepository
    {
        Task<PagedList<HoaDonThuBoSungProcedure>> GetHoaDonThuBoSungAllAsync(HoaDonThuBoSungParam param);
        Task<HoaDonThuBoSungProcedure?> FindHoaDonThuBoSungShowAsync(string maPhieuTienDo);
        Task<HoaDonThuBoSung?> FindHoaDonThuBoSungAsync(string maHoaDonThuBoSung, bool track);
        void CreateHoaDonThuBoSungAsync(HoaDonThuBoSung HoaDonThuBoSung);
        void UpdateHoaDonThuBoSungAsync(HoaDonThuBoSung HoaDonThuBoSung);
        void DeleteHoaDonThuBoSungAsync(HoaDonThuBoSung HoaDonThuBoSung);
    }
}
