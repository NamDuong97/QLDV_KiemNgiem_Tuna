using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuXuatKho")]
public partial class PhieuXuatKho
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuDuTru { get; set; }

    [StringLength(50)]
    public string? MaPhieuXuatKho { get; set; }

    [StringLength(50)]
    public string? ManvLapPhieu { get; set; }

    [StringLength(50)]
    public string? ManvGiaoVatTu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianXuatKho { get; set; }

    [StringLength(50)]
    public string? ManvNhanVatTu { get; set; }

    [StringLength(500)]
    public string? LyDoXuatKho { get; set; }

    [StringLength(500)]
    public string? NoiGiaoVatTu { get; set; }

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

    [InverseProperty("MaPhieuXuatKhoNavigation")]
    public virtual ICollection<ChiTietPhieuXuatKho> ChiTietPhieuXuatKhos { get; set; } = new List<ChiTietPhieuXuatKho>();

    [ForeignKey("MaPhieuDuTru")]
    [InverseProperty("PhieuXuatKhos")]
    public virtual PhieuDuTru? MaPhieuDuTruNavigation { get; set; }

    [ForeignKey("ManvGiaoVatTu")]
    [InverseProperty("PhieuXuatKhoManvGiaoVatTuNavigations")]
    public virtual NhanVien? ManvGiaoVatTuNavigation { get; set; }

    [ForeignKey("ManvLapPhieu")]
    [InverseProperty("PhieuXuatKhoManvLapPhieuNavigations")]
    public virtual NhanVien? ManvLapPhieuNavigation { get; set; }

    [ForeignKey("ManvNhanVatTu")]
    [InverseProperty("PhieuXuatKhoManvNhanVatTuNavigations")]
    public virtual NhanVien? ManvNhanVatTuNavigation { get; set; }
}
