using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("Mau_TieuChuan_ChiTieu")]
public partial class MauTieuChuanChiTieu
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaMauTieuChuan { get; set; }

    [StringLength(50)]
    public string? MaChiTieu { get; set; }

    public string? NoiDung { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [StringLength(100)]
    public string? NguoiTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(100)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaChiTieu")]
    [InverseProperty("MauTieuChuanChiTieus")]
    public virtual ChiTieu? MaChiTieuNavigation { get; set; }

    [ForeignKey("MaMauTieuChuan")]
    [InverseProperty("MauTieuChuanChiTieus")]
    public virtual MauTieuChuan? MaMauTieuChuanNavigation { get; set; }
}
