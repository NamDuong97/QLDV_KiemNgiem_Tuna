using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("NhanVien")]
public partial class NhanVien
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? Manv { get; set; }

    [StringLength(200)]
    public string? HoTen { get; set; }

    [StringLength(50)]
    public string? GioiTinh { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySinh { get; set; }

    [StringLength(500)]
    public string? NoiSinh { get; set; }

    [StringLength(200)]
    public string? DiaChi { get; set; }

    [StringLength(50)]
    public string? MaKhoa { get; set; }

    [StringLength(50)]
    public string? MaBoPhan { get; set; }

    [StringLength(50)]
    public string? MaChucVu { get; set; }

    [Column("CCCD")]
    [StringLength(50)]
    public string? Cccd { get; set; }

    [Column("NgayCapCCCD", TypeName = "datetime")]
    public DateTime? NgayCapCccd { get; set; }

    [StringLength(500)]
    public string? NoiCap { get; set; }

    [StringLength(500)]
    public string? DiaChiThuongTru { get; set; }

    [StringLength(50)]
    public string? EmailCaNhan { get; set; }

    [StringLength(50)]
    public string? SoDienThoai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayLamViec { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayThoiViec { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(200)]
    public string? MatKhau { get; set; }

    [Column("MaLoaiTK")]
    [StringLength(50)]
    public string? MaLoaiTk { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySuaMatKhau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayHetHanMatKhau { get; set; }

    [StringLength(200)]
    public string? RefreshToken { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? RefreshTokenExpiryTime { get; set; }

    [InverseProperty("ManvTuChoiNavigation")]
    public virtual ICollection<ChiTietPhieuDeXuatPhongBan> ChiTietPhieuDeXuatPhongBans { get; set; } = new List<ChiTietPhieuDeXuatPhongBan>();

    [InverseProperty("ManvLapNavigation")]
    public virtual ICollection<HoaDonMuaPlhc> HoaDonMuaPlhcs { get; set; } = new List<HoaDonMuaPlhc>();

    [InverseProperty("ManvLapNavigation")]
    public virtual ICollection<HoaDonThuBoSung> HoaDonThuBoSungs { get; set; } = new List<HoaDonThuBoSung>();

    [InverseProperty("ManvXuLyNavigation")]
    public virtual ICollection<HoaDonThu> HoaDonThus { get; set; } = new List<HoaDonThu>();

    [InverseProperty("ManvCuNavigation")]
    public virtual ICollection<LichSuPhanCong> LichSuPhanCongManvCuNavigations { get; set; } = new List<LichSuPhanCong>();

    [InverseProperty("ManvMoiNavigation")]
    public virtual ICollection<LichSuPhanCong> LichSuPhanCongManvMoiNavigations { get; set; } = new List<LichSuPhanCong>();

    [InverseProperty("ManvPhanCongNavigation")]
    public virtual ICollection<LichSuPhanCong> LichSuPhanCongManvPhanCongNavigations { get; set; } = new List<LichSuPhanCong>();

    [InverseProperty("ManvTaoNavigation")]
    public virtual ICollection<Lkct> Lkcts { get; set; } = new List<Lkct>();

    [ForeignKey("MaBoPhan")]
    [InverseProperty("NhanViens")]
    public virtual BoPhan? MaBoPhanNavigation { get; set; }

    [ForeignKey("MaChucVu")]
    [InverseProperty("NhanViens")]
    public virtual ChucVu? MaChucVuNavigation { get; set; }

    [ForeignKey("MaKhoa")]
    [InverseProperty("NhanViens")]
    public virtual Khoa? MaKhoaNavigation { get; set; }

    [ForeignKey("MaLoaiTk")]
    [InverseProperty("NhanViens")]
    public virtual LoaiTaiKhoan? MaLoaiTkNavigation { get; set; }

    [InverseProperty("ManvPhanCongNavigation")]
    public virtual ICollection<PhanCongNoiBo> PhanCongNoiBoManvPhanCongNavigations { get; set; } = new List<PhanCongNoiBo>();

    [InverseProperty("ManvXyLyNavigation")]
    public virtual ICollection<PhanCongNoiBo> PhanCongNoiBoManvXyLyNavigations { get; set; } = new List<PhanCongNoiBo>();

    [InverseProperty("ManvTaoNavigation")]
    public virtual ICollection<PhieuChi> PhieuChis { get; set; } = new List<PhieuChi>();

    [InverseProperty("MaBldduyetNavigation")]
    public virtual ICollection<PhieuDangKy> PhieuDangKyMaBldduyetNavigations { get; set; } = new List<PhieuDangKy>();

    [InverseProperty("ManvNhanMauNavigation")]
    public virtual ICollection<PhieuDangKy> PhieuDangKyManvNhanMauNavigations { get; set; } = new List<PhieuDangKy>();

    [InverseProperty("ManvSoDuyetNavigation")]
    public virtual ICollection<PhieuDangKy> PhieuDangKyManvSoDuyetNavigations { get; set; } = new List<PhieuDangKy>();

    [InverseProperty("ManvThucHienNavigation")]
    public virtual ICollection<PhieuDangKyMau> PhieuDangKyMaus { get; set; } = new List<PhieuDangKyMau>();

    [InverseProperty("ManvDuyetNavigation")]
    public virtual ICollection<PhieuDeXuatMuaPlhc> PhieuDeXuatMuaPlhcManvDuyetNavigations { get; set; } = new List<PhieuDeXuatMuaPlhc>();

    [InverseProperty("ManvLapNavigation")]
    public virtual ICollection<PhieuDeXuatMuaPlhc> PhieuDeXuatMuaPlhcManvLapNavigations { get; set; } = new List<PhieuDeXuatMuaPlhc>();

    [InverseProperty("ManvDeXuatNavigation")]
    public virtual ICollection<PhieuDeXuatPhongBan> PhieuDeXuatPhongBanManvDeXuatNavigations { get; set; } = new List<PhieuDeXuatPhongBan>();

    [InverseProperty("ManvTiepNhanNavigation")]
    public virtual ICollection<PhieuDeXuatPhongBan> PhieuDeXuatPhongBanManvTiepNhanNavigations { get; set; } = new List<PhieuDeXuatPhongBan>();

    [InverseProperty("ManvLapPhieuNavigation")]
    public virtual ICollection<PhieuDuTru> PhieuDuTrus { get; set; } = new List<PhieuDuTru>();

    [InverseProperty("ManvLuuNavigation")]
    public virtual ICollection<PhieuLuuMau> PhieuLuuMaus { get; set; } = new List<PhieuLuuMau>();

    [InverseProperty("ManvLapPhieuNavigation")]
    public virtual ICollection<PhieuNhapKho> PhieuNhapKhoManvLapPhieuNavigations { get; set; } = new List<PhieuNhapKho>();

    [InverseProperty("ManvNhapKhoNavigation")]
    public virtual ICollection<PhieuNhapKho> PhieuNhapKhoManvNhapKhoNavigations { get; set; } = new List<PhieuNhapKho>();

    [InverseProperty("ManvKiemTraNavigation")]
    public virtual ICollection<PhieuPhanTichKetQua> PhieuPhanTichKetQuaManvKiemTraNavigations { get; set; } = new List<PhieuPhanTichKetQua>();

    [InverseProperty("ManvLapNavigation")]
    public virtual ICollection<PhieuPhanTichKetQua> PhieuPhanTichKetQuaManvLapNavigations { get; set; } = new List<PhieuPhanTichKetQua>();

    [InverseProperty("ManvTaoNavigation")]
    public virtual ICollection<PhieuThu> PhieuThus { get; set; } = new List<PhieuThu>();

    [InverseProperty("ManvKiemTraNavigation")]
    public virtual ICollection<PhieuTienDoLamViec> PhieuTienDoLamViecManvKiemTraNavigations { get; set; } = new List<PhieuTienDoLamViec>();

    [InverseProperty("ManvXuLyNavigation")]
    public virtual ICollection<PhieuTienDoLamViec> PhieuTienDoLamViecManvXuLyNavigations { get; set; } = new List<PhieuTienDoLamViec>();

    [InverseProperty("ManvGiaoVatTuNavigation")]
    public virtual ICollection<PhieuXuatKho> PhieuXuatKhoManvGiaoVatTuNavigations { get; set; } = new List<PhieuXuatKho>();

    [InverseProperty("ManvLapPhieuNavigation")]
    public virtual ICollection<PhieuXuatKho> PhieuXuatKhoManvLapPhieuNavigations { get; set; } = new List<PhieuXuatKho>();

    [InverseProperty("ManvNhanVatTuNavigation")]
    public virtual ICollection<PhieuXuatKho> PhieuXuatKhoManvNhanVatTuNavigations { get; set; } = new List<PhieuXuatKho>();

    [InverseProperty("ManvGuiNavigation")]
    public virtual ICollection<ThongBaoChoKhachHang> ThongBaoChoKhachHangs { get; set; } = new List<ThongBaoChoKhachHang>();

    [InverseProperty("NhanVien")]
    public virtual ICollection<ThongBaoChoTrungTamNhan> ThongBaoChoTrungTamNhans { get; set; } = new List<ThongBaoChoTrungTamNhan>();

    [InverseProperty("NhanVien")]
    public virtual ICollection<ThongBaoNoiBoNhan> ThongBaoNoiBoNhans { get; set; } = new List<ThongBaoNoiBoNhan>();

    [InverseProperty("ManvGuiNavigation")]
    public virtual ICollection<ThongBaoNoiBo> ThongBaoNoiBos { get; set; } = new List<ThongBaoNoiBo>();
}
