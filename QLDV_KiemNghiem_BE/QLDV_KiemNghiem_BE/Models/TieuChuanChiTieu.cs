using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("TieuChuan_ChiTieu")]
public partial class TieuChuanChiTieu
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaTieuChuan { get; set; }

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
    [InverseProperty("TieuChuanChiTieus")]
    public virtual ChiTieu? MaChiTieuNavigation { get; set; }

    [ForeignKey("MaTieuChuan")]
    [InverseProperty("TieuChuanChiTieus")]
    public virtual TieuChuan? MaTieuChuanNavigation { get; set; }
}
