namespace QLDV_KiemNghiem_BE.Interfaces.ManagerInterface
{
    public interface IRepositoryManager
    {
        IPhieuDangKyRepository PhieuDangKy { get; }
        IMauRepository Mau { get; }
        IDmPhuLieuHoaChatRepository DmPhuLieuHoaChat { get; }
        IPhieuDangKyPhuLieuHoaChatRepository PhieuDangKyPhuLieuHoaChat { get; }
        ITieuChuanRepository TieuChuan { get; }
        IChiTieuRepositoty ChiTieu { get;  }
        IPhuongPhapRepository PhuongPhap { get; }  
        IDuocDienRepository DuocDien { get; }
        IBoPhanRepository BoPhan { get; }
        IKhoaRepository Khoa { get; }
        IChucVuRepository ChucVu { get; }
        IMauHinhAnhRepository MauHinhAnh { get; }
        Task<bool> SaveChangesAsync();
    }
}
