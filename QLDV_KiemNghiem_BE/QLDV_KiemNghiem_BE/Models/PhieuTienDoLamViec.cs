using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuTienDoLamViec")]
public partial class PhieuTienDoLamViec
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuTienDo { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayNhanMau { get; set; }

    [StringLength(50)]
    public string? ManvXuLy { get; set; }

    [StringLength(500)]
    public string? TenGiaiDoanThucHien { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianTu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianDen { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? TongThoiGianThucHien { get; set; }

    public string? NoiDungBaoCao { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [StringLength(50)]
    public string? ManvKiemTra { get; set; }

    public bool? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [Column("MaPDK_Mau")]
    [StringLength(50)]
    public string? MaPdkMau { get; set; }

    [ForeignKey("MaPdkMau")]
    [InverseProperty("PhieuTienDoLamViecs")]
    public virtual PhieuDangKyMau? MaPdkMauNavigation { get; set; }

    [ForeignKey("ManvKiemTra")]
    [InverseProperty("PhieuTienDoLamViecManvKiemTraNavigations")]
    public virtual NhanVien? ManvKiemTraNavigation { get; set; }

    [ForeignKey("ManvXuLy")]
    [InverseProperty("PhieuTienDoLamViecManvXuLyNavigations")]
    public virtual NhanVien? ManvXuLyNavigation { get; set; }
}
