using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ChiTietPhieuXuatKho")]
public partial class ChiTietPhieuXuatKho
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuXuatKho { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoLuong { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? DonGia { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? ThanhTien { get; set; }

    [StringLength(100)]
    public string? TrangThai { get; set; }

    [Column("MaDM_PLHC")]
    [StringLength(50)]
    public string? MaDmPlhc { get; set; }

    [ForeignKey("MaDmPlhc")]
    [InverseProperty("ChiTietPhieuXuatKhos")]
    public virtual DmPhuLieuHoaChat? MaDmPlhcNavigation { get; set; }

    [ForeignKey("MaPhieuXuatKho")]
    [InverseProperty("ChiTietPhieuXuatKhos")]
    public virtual PhieuXuatKho? MaPhieuXuatKhoNavigation { get; set; }
}
