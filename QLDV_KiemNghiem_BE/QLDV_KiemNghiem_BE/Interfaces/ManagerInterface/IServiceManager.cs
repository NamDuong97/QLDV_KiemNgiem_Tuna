using QLDV_KiemNghiem_BE.Interfaces;

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
    }
}
