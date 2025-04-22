using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhuLieu_HoaChat")]
public partial class PhuLieuHoaChat
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaPLHC")]
    [StringLength(50)]
    public string? MaPlhc { get; set; }

    [Column("TenPLHC")]
    [StringLength(200)]
    public string? TenPlhc { get; set; }

    [Column("MaLoaiPLHC")]
    [StringLength(50)]
    public string? MaLoaiPlhc { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [StringLength(200)]
    public string? DieuKienBaoQuan { get; set; }

    [StringLength(50)]
    public string? MaNhaCungCap { get; set; }

    [StringLength(200)]
    public string? TenNhaCungCap { get; set; }

    [StringLength(50)]
    public string? SoLo { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoLuong { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? DonGia { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayHetHan { get; set; }

    [Column("HamLuong_NongDo")]
    [StringLength(100)]
    public string? HamLuongNongDo { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? GiaHienTai { get; set; }

    [StringLength(500)]
    public string? MoTa { get; set; }

    [StringLength(50)]
    public string? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [InverseProperty("MaPhuLieuHcNavigation")]
    public virtual ICollection<ChiTietHoaDonThuBoSung> ChiTietHoaDonThuBoSungs { get; set; } = new List<ChiTietHoaDonThuBoSung>();

    [InverseProperty("MaPlhcNavigation")]
    public virtual ICollection<ChiTietPhieuDuTru> ChiTietPhieuDuTrus { get; set; } = new List<ChiTietPhieuDuTru>();

    [InverseProperty("MaPlhcNavigation")]
    public virtual ICollection<ChiTietPhieuXuatKho> ChiTietPhieuXuatKhos { get; set; } = new List<ChiTietPhieuXuatKho>();

    [InverseProperty("MaPlhcNavigation")]
    public virtual ICollection<HoaDonMuaPlhcchiTiet> HoaDonMuaPlhcchiTiets { get; set; } = new List<HoaDonMuaPlhcchiTiet>();

    [ForeignKey("MaLoaiPlhc")]
    [InverseProperty("PhuLieuHoaChats")]
    public virtual LoaiPhuLieuHoaChat? MaLoaiPlhcNavigation { get; set; }

    [ForeignKey("MaNhaCungCap")]
    [InverseProperty("PhuLieuHoaChats")]
    public virtual NhaCungCap? MaNhaCungCapNavigation { get; set; }

    [InverseProperty("MaPlhcNavigation")]
    public virtual ICollection<MauPlhcCan> MauPlhcCans { get; set; } = new List<MauPlhcCan>();

    [InverseProperty("MaPlhcNavigation")]
    public virtual ICollection<MauPlhcCungCap> MauPlhcCungCaps { get; set; } = new List<MauPlhcCungCap>();

    [InverseProperty("MaPlhcNavigation")]
    public virtual ICollection<PhieuDeXuatMuaPlhcchiTiet> PhieuDeXuatMuaPlhcchiTiets { get; set; } = new List<PhieuDeXuatMuaPlhcchiTiet>();

    [InverseProperty("MaPlhcNavigation")]
    public virtual ICollection<PhieuNhapKhoChiTiet> PhieuNhapKhoChiTiets { get; set; } = new List<PhieuNhapKhoChiTiet>();
}
