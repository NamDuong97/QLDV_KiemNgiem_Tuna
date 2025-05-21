using QLDV_KiemNghiem_BE.Interfaces;

namespace QLDV_KiemNghiem_BE.Interfaces.ManagerInterface
{
    public interface IServiceManager
    {
        IPhieuDangKyService PhieuDangKy { get; }
        IMauService Mau { get; }
        IDmPhuLieuHoaChatService DmPhuLieuHoaChat { get; }
        IPhieuDangKyPhuLieuHoaChatService PhieuDangKyPhuLieuHoaChat { get; }

    }
}
