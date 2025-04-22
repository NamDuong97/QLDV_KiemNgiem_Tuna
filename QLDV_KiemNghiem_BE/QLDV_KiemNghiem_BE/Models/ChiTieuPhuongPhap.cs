using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ChiTieu_PhuongPhap")]
public partial class ChiTieuPhuongPhap
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaPP")]
    [StringLength(50)]
    public string? MaPp { get; set; }

    [StringLength(50)]
    public string? MaChiTieu { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? ThoiGianLam { get; set; }

    public bool? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaChiTieu")]
    [InverseProperty("ChiTieuPhuongPhaps")]
    public virtual ChiTieu? MaChiTieuNavigation { get; set; }

    [ForeignKey("MaPp")]
    [InverseProperty("ChiTieuPhuongPhaps")]
    public virtual PhuongPhap? MaPpNavigation { get; set; }
}
