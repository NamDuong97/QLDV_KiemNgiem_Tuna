using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.Interfaces.ManagerInterface
{
    public interface IRepositoryManager
    {
        IPhieuDangKyRepository PhieuDangKy { get; }
        IPhieuDangKyMauRepository PhieuDangKyMau { get; }
        IDmPhuLieuHoaChatRepository DmPhuLieuHoaChat { get; }
        IPhieuDangKyPhuLieuHoaChatRepository PhieuDangKyPhuLieuHoaChat { get; }
        ITieuChuanRepository TieuChuan { get; }
        IChiTieuRepositoty ChiTieu { get;  }
        IPhuongPhapRepository PhuongPhap { get; }  
        IBoPhanRepository BoPhan { get; }
        IKhoaRepository Khoa { get; }
        IChucVuRepository ChucVu { get; }
        IPhieuDangKyMauHinhAnhRepository PhieuDangKyMauHinhAnh { get; }
        ILoaiMauRepository LoaiMau { get; }
        ILoaiDichVuRepository LoaiDichVu { get; }
        IDmMauRepository DmMau { get; }
        ITrangThaiPhieuDkRepository TrangThaiPhieuDk { get; }
        Task<bool> SaveChangesAsync();
    }
}
