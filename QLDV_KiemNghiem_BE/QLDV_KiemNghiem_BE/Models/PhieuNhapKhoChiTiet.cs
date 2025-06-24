using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuNhapKhoChiTiet")]
public partial class PhieuNhapKhoChiTiet
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuNhapKho { get; set; }

    [Column("TenPLHC")]
    [StringLength(200)]
    public string? TenPlhc { get; set; }

    [StringLength(500)]
    public string? DieuKienBaoQuan { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoLuong { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? DonGia { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? ThanhTien { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [Column("MaDM_PLHC")]
    [StringLength(50)]
    public string? MaDmPlhc { get; set; }

    [StringLength(500)]
    public string? TenNhaCungCap { get; set; }

    [StringLength(50)]
    public string? SoLo { get; set; }

    [ForeignKey("MaDmPlhc")]
    [InverseProperty("PhieuNhapKhoChiTiets")]
    public virtual DmPhuLieuHoaChat? MaDmPlhcNavigation { get; set; }

    [ForeignKey("MaPhieuNhapKho")]
    [InverseProperty("PhieuNhapKhoChiTiets")]
    public virtual PhieuNhapKho? MaPhieuNhapKhoNavigation { get; set; }
}
