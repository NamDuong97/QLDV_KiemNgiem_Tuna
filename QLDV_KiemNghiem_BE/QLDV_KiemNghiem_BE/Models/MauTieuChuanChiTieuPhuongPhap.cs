using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("Mau_TieuChuan_ChiTieu_PhuongPhap")]
public partial class MauTieuChuanChiTieuPhuongPhap
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaMauTieuChuanChiTieu { get; set; }

    [Column("MaPP")]
    [StringLength(50)]
    public string? MaPp { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaMauTieuChuanChiTieu")]
    [InverseProperty("MauTieuChuanChiTieuPhuongPhaps")]
    public virtual MauTieuChuanChiTieu? MaMauTieuChuanChiTieuNavigation { get; set; }

    [ForeignKey("MaPp")]
    [InverseProperty("MauTieuChuanChiTieuPhuongPhaps")]
    public virtual PhuongPhap? MaPpNavigation { get; set; }
}
