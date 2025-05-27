using QLDV_KiemNghiem_BE.Interfaces;

namespace QLDV_KiemNghiem_BE.Interfaces.ManagerInterface
{
    public interface IServiceManager
    {
        IPhieuDangKyService PhieuDangKy { get; }
        IMauService Mau { get; }
        IDmPhuLieuHoaChatService DmPhuLieuHoaChat { get; }
        IPhieuDangKyPhuLieuHoaChatService PhieuDangKyPhuLieuHoaChat { get; }
        ITieuChuanService TieuChuan { get; }
        IChiTieuService ChiTieu { get; }    
        IPhuongPhapService PhuongPhap { get; }
        IBoPhanService BoPhan { get; }
        IKhoaService Khoa { get; }
        IChucVuService ChucVu { get; }
        IMauHinhAnhService MauHinhAnh { get; }
    }
}
