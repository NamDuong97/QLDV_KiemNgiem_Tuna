
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
        IHoaDonThuRepository HoaDonThu { get; }
        IChiTietHoaDonThuRepository ChiTietHoaDonThu { get; }
        IPhieuDeXuatPhongBanRepository PhieuDeXuatPhongBan { get; }
        IPhanCongNoiBoRepository PhanCongNoiBo { get; }
        IPhieuDuTruRepository PhieuDuTru { get; }
        IPhieuLuuMauRepository PhieuLuuMau { get; }
        IPhieuTienDoLamViecRepository PhieuTienDoLamViec { get; }
        IPhieuPhanTichKetQuaRepository PhieuPhanTichKetQua { get; }
        IKhachHangRepository KhachHang { get; }
        INhanVienRepository NhanVien { get; }
        IPhieuChiRepository PhieuChi { get; }
        IPhieuPhanTichKetQuaChiTietRepository PhieuPhanTichKetQuaChiTiet { get; }
        IPhieuThuRepository PhieuThu { get; }
        IChiTietPhieuDeXuatPhongBanRepository ChiTietPhieuDeXuatPhongBan { get; }
        ILichSuPhanCongRepository LichSuPhanCong { get; }
        IChiTietPhieuDuTruRepository ChiTietPhieuDuTru { get; }
        Task<bool> SaveChangesAsync();
    }
}
