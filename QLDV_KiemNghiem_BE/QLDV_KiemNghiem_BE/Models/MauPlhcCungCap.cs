using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("Mau_PLHC_CungCap")]
public partial class MauPlhcCungCap
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaPLHC")]
    [StringLength(50)]
    public string? MaPlhc { get; set; }

    [StringLength(50)]
    public string? MaMau { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    public int? SoLuongCungCap { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaMau")]
    [InverseProperty("MauPlhcCungCaps")]
    public virtual Mau? MaMauNavigation { get; set; }

    [ForeignKey("MaPlhc")]
    [InverseProperty("MauPlhcCungCaps")]
    public virtual PhuLieuHoaChat? MaPlhcNavigation { get; set; }
}
