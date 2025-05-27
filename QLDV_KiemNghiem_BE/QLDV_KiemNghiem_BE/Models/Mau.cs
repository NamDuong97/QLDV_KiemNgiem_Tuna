using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("Mau")]
public partial class Mau
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaMau { get; set; }

    [StringLength(200)]
    public string? TenMau { get; set; }

    [StringLength(50)]
    public string? MaLoaiMau { get; set; }

    [StringLength(50)]
    public string? MaTieuChuan { get; set; }

    [StringLength(50)]
    public string? MaPhieuDangKy { get; set; }

    [StringLength(50)]
    public string? ManvThucHien { get; set; }

    [StringLength(50)]
    public string? Madv { get; set; }

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

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    public int? ThoiGianTieuChuan { get; set; }

    [InverseProperty("MaMauNavigation")]
    public virtual ICollection<ChiTietHoaDonThu> ChiTietHoaDonThus { get; set; } = new List<ChiTietHoaDonThu>();

    [ForeignKey("MaLoaiMau")]
    [InverseProperty("Maus")]
    public virtual LoaiMau? MaLoaiMauNavigation { get; set; }

    [ForeignKey("MaPhieuDangKy")]
    [InverseProperty("Maus")]
    public virtual PhieuDangKy? MaPhieuDangKyNavigation { get; set; }

    [ForeignKey("MaTieuChuan")]
    [InverseProperty("Maus")]
    public virtual TieuChuan? MaTieuChuanNavigation { get; set; }

    [ForeignKey("Madv")]
    [InverseProperty("Maus")]
    public virtual DichVu? MadvNavigation { get; set; }

    [ForeignKey("ManvThucHien")]
    [InverseProperty("Maus")]
    public virtual NhanVien? ManvThucHienNavigation { get; set; }

    [InverseProperty("MaMauNavigation")]
    public virtual ICollection<MauHinhAnh> MauHinhAnhs { get; set; } = new List<MauHinhAnh>();

    [InverseProperty("MaMauNavigation")]
    public virtual ICollection<PhanCongNoiBo> PhanCongNoiBos { get; set; } = new List<PhanCongNoiBo>();

    [InverseProperty("MaMauNavigation")]
    public virtual ICollection<PhieuDuTru> PhieuDuTrus { get; set; } = new List<PhieuDuTru>();

    [InverseProperty("MaMauNavigation")]
    public virtual ICollection<PhieuLuuMau> PhieuLuuMaus { get; set; } = new List<PhieuLuuMau>();

    [InverseProperty("MaMauNavigation")]
    public virtual ICollection<PhieuPhanTichKetQua> PhieuPhanTichKetQuas { get; set; } = new List<PhieuPhanTichKetQua>();

    [InverseProperty("MaMauNavigation")]
    public virtual ICollection<PhieuTienDoLamViec> PhieuTienDoLamViecs { get; set; } = new List<PhieuTienDoLamViec>();
}
