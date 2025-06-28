using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhanCongNoiBo")]
public partial class PhanCongNoiBo
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhanCongNoiBo { get; set; }

    [StringLength(50)]
    public string? ManvXyLy { get; set; }

    [Column("MaPDK_Mau")]
    [StringLength(50)]
    public string? MaPdkMau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LamTu { get; set; }

    [StringLength(50)]
    public string? ManvPhanCong { get; set; }

    [StringLength(200)]
    public string? TennvPhanCong { get; set; }

    public bool? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(200)]
    public string? TennvXuly { get; set; }

    [StringLength(200)]
    public string? TenMau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTraKetQua { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [InverseProperty("MaPhanCongNoiBoNavigation")]
    public virtual ICollection<LichSuPhanCong> LichSuPhanCongs { get; set; } = new List<LichSuPhanCong>();

    [ForeignKey("MaPdkMau")]
    [InverseProperty("PhanCongNoiBos")]
    public virtual PhieuDangKyMau? MaPdkMauNavigation { get; set; }

    [ForeignKey("ManvPhanCong")]
    [InverseProperty("PhanCongNoiBoManvPhanCongNavigations")]
    public virtual NhanVien? ManvPhanCongNavigation { get; set; }

    [ForeignKey("ManvXyLy")]
    [InverseProperty("PhanCongNoiBoManvXyLyNavigations")]
    public virtual NhanVien? ManvXyLyNavigation { get; set; }
}
