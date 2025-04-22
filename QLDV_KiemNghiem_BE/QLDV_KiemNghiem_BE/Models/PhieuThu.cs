using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuThu")]
public partial class PhieuThu
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuThu { get; set; }

    [StringLength(50)]
    public string? ManvTao { get; set; }

    public string? LyDoThu { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoTien { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayThu { get; set; }

    [StringLength(50)]
    public string? MaLienKetChungTu { get; set; }

    [StringLength(100)]
    public string? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaLienKetChungTu")]
    [InverseProperty("PhieuThus")]
    public virtual Lkct? MaLienKetChungTuNavigation { get; set; }

    [ForeignKey("ManvTao")]
    [InverseProperty("PhieuThus")]
    public virtual NhanVien? ManvTaoNavigation { get; set; }
}
