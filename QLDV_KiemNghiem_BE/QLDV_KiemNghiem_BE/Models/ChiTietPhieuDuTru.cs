using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ChiTietPhieuDuTru")]
public partial class ChiTietPhieuDuTru
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuDuTru { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoLuong { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    public bool? TrangThai { get; set; }

    [Column("MaDM_PLHC")]
    [StringLength(50)]
    public string? MaDmPlhc { get; set; }

    [ForeignKey("MaDmPlhc")]
    [InverseProperty("ChiTietPhieuDuTrus")]
    public virtual DmPhuLieuHoaChat? MaDmPlhcNavigation { get; set; }

    [ForeignKey("MaPhieuDuTru")]
    [InverseProperty("ChiTietPhieuDuTrus")]
    public virtual PhieuDuTru? MaPhieuDuTruNavigation { get; set; }
}
