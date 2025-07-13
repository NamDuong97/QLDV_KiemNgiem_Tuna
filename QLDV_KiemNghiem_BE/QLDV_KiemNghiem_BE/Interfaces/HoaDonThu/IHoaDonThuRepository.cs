using QLDV_KiemNghiem_BE.DTO;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;
using QLDV_KiemNghiem_BE.Models;
using QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest;
using QLDV_KiemNghiem_BE.Shared;

namespace QLDV_KiemNghiem_BE.Interfaces
{
    public interface IHoaDonThuRepository
    {
        Task<PagedList<HoaDonThuProcedure>> GetAllHoaDonThuByBoLocAsync(HoaDonThuParam param);
        Task<decimal> GetToTalMoneyOfMau(string dmMau, string maTieuChuan, string maLoaiDichVu);
        Task<HoaDonThu?> FindHoaDonThuAsync(string maHoaDonThu, bool track);
        Task<HoaDonThuProcedure?> FindHoaDonThuShowAsync(string maHoaDonThu);
        Task<HoaDonThu?> CheckExistHoaDonThuByPhieuDangKyAsync(string maPhieuDangKy, bool tracking);
        Task<int> UpdateTongTienHoaDonThu(string maHD);
        Task CreateHoaDonThuAsync(HoaDonThu HoaDonThu);
        void UpdateHoaDonThuAsync(HoaDonThu HoaDonThu);
        Task<HoaDonThu> UpdateHoaDonThuByMaPhieuDangKyAsync(string maPhieuDangKy);
        void DeleteHoaDonThuAsync(HoaDonThu HoaDonThu);
    }
}
