using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ChiTietPhieuDeXuatMuaPLHC")]
public partial class ChiTietPhieuDeXuatMuaPlhc
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuDeXuatMua { get; set; }

    [Column("MaPLHC")]
    [StringLength(50)]
    public string? MaPlhc { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoLuong { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [StringLength(100)]
    public string? TrangThai { get; set; }

    [ForeignKey("MaPhieuDeXuatMua")]
    [InverseProperty("ChiTietPhieuDeXuatMuaPlhcs")]
    public virtual PhieuDeXuatMuaPlhc? MaPhieuDeXuatMuaNavigation { get; set; }

    [ForeignKey("MaPlhc")]
    [InverseProperty("ChiTietPhieuDeXuatMuaPlhcs")]
    public virtual PhuLieuHoaChatKho? MaPlhcNavigation { get; set; }
}
