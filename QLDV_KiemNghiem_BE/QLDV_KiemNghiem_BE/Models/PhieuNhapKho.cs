using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuNhapKho")]
public partial class PhieuNhapKho
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime? NgayNhapKho { get; set; }

    [StringLength(50)]
    public string? ManvLapPhieu { get; set; }

    [StringLength(50)]
    public string? ManvNhapKho { get; set; }

    [StringLength(200)]
    public string? NhaCungCap { get; set; }

    [StringLength(100)]
    public string? NguoiGiaoHang { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [StringLength(50)]
    public string? TrangThai { get; set; }

    [Column("MaHoaDonMuaPLHC")]
    [StringLength(50)]
    public string? MaHoaDonMuaPlhc { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaHoaDonMuaPlhc")]
    [InverseProperty("PhieuNhapKhos")]
    public virtual HoaDonMuaPlhc? MaHoaDonMuaPlhcNavigation { get; set; }

    [ForeignKey("ManvLapPhieu")]
    [InverseProperty("PhieuNhapKhoManvLapPhieuNavigations")]
    public virtual NhanVien? ManvLapPhieuNavigation { get; set; }

    [ForeignKey("ManvNhapKho")]
    [InverseProperty("PhieuNhapKhoManvNhapKhoNavigations")]
    public virtual NhanVien? ManvNhapKhoNavigation { get; set; }

    [InverseProperty("MaPhieuNhapKhoNavigation")]
    public virtual ICollection<PhieuNhapKhoChiTiet> PhieuNhapKhoChiTiets { get; set; } = new List<PhieuNhapKhoChiTiet>();
}
