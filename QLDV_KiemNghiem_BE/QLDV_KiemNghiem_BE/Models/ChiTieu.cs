using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ChiTieu")]
public partial class ChiTieu
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(200)]
    public string? MaChiTieu { get; set; }

    [StringLength(200)]
    public string? TenChiTieu { get; set; }

    public string? GhiChu { get; set; }

    public bool? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [InverseProperty("MaChiTieuNavigation")]
    public virtual ICollection<ChiTieuPhuongPhap> ChiTieuPhuongPhaps { get; set; } = new List<ChiTieuPhuongPhap>();

    [InverseProperty("MaChiTieuNavigation")]
    public virtual ICollection<MauTieuChuanChiTieu> MauTieuChuanChiTieus { get; set; } = new List<MauTieuChuanChiTieu>();
}
