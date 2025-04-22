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

    [Column("MaPLHC")]
    [StringLength(50)]
    public string? MaPlhc { get; set; }

    [StringLength(500)]
    public string? DieuKienBaoQuan { get; set; }

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

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaHoaDon")]
    [InverseProperty("HoaDonMuaPlhcchiTiets")]
    public virtual HoaDonMuaPlhc? MaHoaDonNavigation { get; set; }

    [ForeignKey("MaPlhc")]
    [InverseProperty("HoaDonMuaPlhcchiTiets")]
    public virtual PhuLieuHoaChat? MaPlhcNavigation { get; set; }
}
