using QLDV_KiemNghiem_BE.Interfaces;
using QLDV_KiemNghiem_BE.Repositories;
using QLDV_KiemNghiem_BE.Services;

namespace QLDV_KiemNghiem_BE.Interfaces.ManagerInterface
{
    public interface IServiceManager
    {
        IPhieuDangKyService PhieuDangKy { get; }
        IPhieuDangKyMauService PhieuDangKyMau { get; }
        IDmPhuLieuHoaChatService DmPhuLieuHoaChat { get; }
        IPhieuDangKyPhuLieuHoaChatService PhieuDangKyPhuLieuHoaChat { get; }
        ITieuChuanService TieuChuan { get; }
        IChiTieuService ChiTieu { get; }    
        IPhuongPhapService PhuongPhap { get; }
        IBoPhanService BoPhan { get; }
        IKhoaService Khoa { get; }
        IChucVuService ChucVu { get; }
        IPhieuDangKyMauHinhAnhService MauHinhAnh { get; }
        ILoaiMauService LoaiMau { get; }
        ILoaiDichVuService LoaiDichVu { get; }
        IDmMauService DmMau { get; }
        ITrangThaiPhieuDkService TrangThaiPhieuDk { get; }
        IHoaDonThuService HoaDonThu { get; }
        IChiTietHoaDonThuService ChiTietHoaDonThu { get; }
        IPhieuDeXuatPhongBanService PhieuDeXuatPhongBan { get; }
        IPhanCongNoiBoService PhanCongNoiBo { get; }
        IPhieuDuTruService PhieuDuTru { get; }
        IPhieuLuuMauService PhieuLuuMau { get; }
        IPhieuTienDoLamViecService PhieuTienDoLamViec { get; }
        IPhieuPhanTichKetQuaService PhieuPhanTichKetQua { get; }
        IKhachHangService KhachHang { get; }
        INhanVienService NhanVien { get; }
        IPhieuChiService PhieuChi { get; }
        IPhieuPhanTichKetQuaChiTietService PhieuPhanTichKetQuaChiTiet { get; }
        IPhieuThuService PhieuThu { get; }
        IChiTietPhieuDeXuatPhongBanService ChiTietPhieuDeXuatPhongBan { get; }
        ILichSuPhanCongService LichSuPhanCong { get; }
        IChiTietPhieuDuTruService ChiTietPhieuDuTru { get; }
        IHoaDonThuBoSungService HoaDonThuBoSung { get; }
        IChiTietHoaDonThuBoSungService ChiTietHoaDonThuBoSung { get; }
        //ITokenService Token { get; }
        //IEmailService Email { get; }
    }
}
