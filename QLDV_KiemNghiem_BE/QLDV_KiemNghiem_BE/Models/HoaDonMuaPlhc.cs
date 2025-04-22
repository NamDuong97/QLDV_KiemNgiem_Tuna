using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("HoaDonMuaPLHC")]
public partial class HoaDonMuaPlhc
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(100)]
    public string? MaHoaDonMua { get; set; }

    [StringLength(50)]
    public string? ManvLap { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayLap { get; set; }

    [StringLength(200)]
    public string? NhaCungCap { get; set; }

    [StringLength(50)]
    public string? SoLo { get; set; }

    [StringLength(50)]
    public string? MaNhaCungCap { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? TongTien { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? TienThue { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? TongThanhToan { get; set; }

    [StringLength(200)]
    public string? FileDinhKem { get; set; }

    public string? GhiChu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [InverseProperty("MaHoaDonNavigation")]
    public virtual ICollection<HoaDonMuaPlhcchiTiet> HoaDonMuaPlhcchiTiets { get; set; } = new List<HoaDonMuaPlhcchiTiet>();

    [ForeignKey("MaNhaCungCap")]
    [InverseProperty("HoaDonMuaPlhcs")]
    public virtual NhaCungCap? MaNhaCungCapNavigation { get; set; }

    [ForeignKey("ManvLap")]
    [InverseProperty("HoaDonMuaPlhcs")]
    public virtual NhanVien? ManvLapNavigation { get; set; }

    [InverseProperty("MaHoaDonMuaPlhcNavigation")]
    public virtual ICollection<PhieuChi> PhieuChis { get; set; } = new List<PhieuChi>();

    [InverseProperty("MaHoaDonMuaPlhcNavigation")]
    public virtual ICollection<PhieuNhapKho> PhieuNhapKhos { get; set; } = new List<PhieuNhapKho>();
}
