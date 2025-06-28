using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuDangKy_Mau")]
public partial class PhieuDangKyMau
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaDm_Mau")]
    [StringLength(50)]
    public string? MaDmMau { get; set; }

    [StringLength(200)]
    public string? TenMau { get; set; }

    [StringLength(50)]
    public string? MaTieuChuan { get; set; }

    [StringLength(50)]
    public string? MaPhieuDangKy { get; set; }

    [StringLength(50)]
    public string? ManvThucHien { get; set; }

    [StringLength(50)]
    public string? SoLo { get; set; }

    [StringLength(200)]
    public string? DonViSanXuat { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySanXuat { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? HanSuDung { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 0)")]
    public decimal? SoLuong { get; set; }

    public string? YeuCauKiemNghiem { get; set; }

    [StringLength(500)]
    public string? TinhTrangMau { get; set; }

    [StringLength(200)]
    public string? DieuKienBaoQuan { get; set; }

    public bool? LuuMau { get; set; }

    public bool? XuatKetQua { get; set; }

    [StringLength(50)]
    public string? TrangThaiNhanMau { get; set; }

    [StringLength(50)]
    public string? GhiChu { get; set; }

    public int? ThoiGianTieuChuan { get; set; }

    [Column("MaPDK_Mau")]
    [StringLength(50)]
    public string? MaPdkMau { get; set; }

    [Column("LoaiDV")]
    [StringLength(50)]
    public string? LoaiDv { get; set; }

    [Column("MaLoaiDV")]
    [StringLength(50)]
    public string? MaLoaiDv { get; set; }

    public bool? IsDel { get; set; }

    public int? TrangThaiPhanCong { get; set; }

    [Column("NgayNhanMau_PLHC", TypeName = "datetime")]
    public DateTime? NgayNhanMauPlhc { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(500)]
    public string? LyDoHuyMau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTraKetQua { get; set; }

    [InverseProperty("MaMauNavigation")]
    public virtual ICollection<ChiTietHoaDonThu> ChiTietHoaDonThus { get; set; } = new List<ChiTietHoaDonThu>();

    [InverseProperty("MaPdkMauNavigation")]
    public virtual ICollection<ChiTietPhieuDeXuatPhongBan> ChiTietPhieuDeXuatPhongBans { get; set; } = new List<ChiTietPhieuDeXuatPhongBan>();

    [ForeignKey("MaDmMau")]
    [InverseProperty("PhieuDangKyMaus")]
    public virtual DmMau? MaDmMauNavigation { get; set; }

    [ForeignKey("MaLoaiDv")]
    [InverseProperty("PhieuDangKyMaus")]
    public virtual LoaiDichVu? MaLoaiDvNavigation { get; set; }

    [ForeignKey("MaPhieuDangKy")]
    [InverseProperty("PhieuDangKyMaus")]
    public virtual PhieuDangKy? MaPhieuDangKyNavigation { get; set; }

    [ForeignKey("MaTieuChuan")]
    [InverseProperty("PhieuDangKyMaus")]
    public virtual TieuChuan? MaTieuChuanNavigation { get; set; }

    [ForeignKey("ManvThucHien")]
    [InverseProperty("PhieuDangKyMaus")]
    public virtual NhanVien? ManvThucHienNavigation { get; set; }

    [InverseProperty("MaPdkMauNavigation")]
    public virtual ICollection<PhanCongNoiBo> PhanCongNoiBos { get; set; } = new List<PhanCongNoiBo>();

    [InverseProperty("MaMauNavigation")]
    public virtual ICollection<PhieuDangKyMauHinhAnh> PhieuDangKyMauHinhAnhs { get; set; } = new List<PhieuDangKyMauHinhAnh>();

    [InverseProperty("MaPdkMauNavigation")]
    public virtual ICollection<PhieuDuTru> PhieuDuTrus { get; set; } = new List<PhieuDuTru>();

    [InverseProperty("MaPdkMauNavigation")]
    public virtual ICollection<PhieuLuuMau> PhieuLuuMaus { get; set; } = new List<PhieuLuuMau>();

    [InverseProperty("MaPdkMauNavigation")]
    public virtual ICollection<PhieuPhanTichKetQua> PhieuPhanTichKetQuas { get; set; } = new List<PhieuPhanTichKetQua>();

    [InverseProperty("MaPdkMauNavigation")]
    public virtual ICollection<PhieuTienDoLamViec> PhieuTienDoLamViecs { get; set; } = new List<PhieuTienDoLamViec>();
}
