using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("HoaDonMuaPLHCChiTiet")]
public partial class HoaDonMuaPlhcchiTiet
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaHoaDon { get; set; }

    [Column("TenPLHC")]
    [StringLength(200)]
    public string? TenPlhc { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoLuong { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? DonGia { get; set; }

    [Column("DonGiaSauVAT", TypeName = "decimal(18, 2)")]
    public decimal? DonGiaSauVat { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? ThanhTien { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [StringLength(50)]
    public string? SoLo { get; set; }

    [StringLength(50)]
    public string? MaNhaCungCap { get; set; }

    [StringLength(200)]
    public string? TenNhaCungCap { get; set; }

    [Column("MaDM_PLHC")]
    [StringLength(50)]
    public string? MaDmPlhc { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayHetHan { get; set; }

    [ForeignKey("MaDmPlhc")]
    [InverseProperty("HoaDonMuaPlhcchiTiets")]
    public virtual DmPhuLieuHoaChat? MaDmPlhcNavigation { get; set; }

    [ForeignKey("MaHoaDon")]
    [InverseProperty("HoaDonMuaPlhcchiTiets")]
    public virtual HoaDonMuaPlhc? MaHoaDonNavigation { get; set; }

    [ForeignKey("MaNhaCungCap")]
    [InverseProperty("HoaDonMuaPlhcchiTiets")]
    public virtual NhaCungCap? MaNhaCungCapNavigation { get; set; }
}
