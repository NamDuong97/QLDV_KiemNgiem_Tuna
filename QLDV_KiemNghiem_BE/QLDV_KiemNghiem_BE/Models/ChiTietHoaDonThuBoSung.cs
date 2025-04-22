using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ChiTietHoaDonThuBoSung")]
public partial class ChiTietHoaDonThuBoSung
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaHDBS")]
    [StringLength(50)]
    public string? MaHdbs { get; set; }

    [Column("MaPhuLieu_HC")]
    [StringLength(50)]
    public string? MaPhuLieuHc { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    public int? SoLuong { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? DonGia { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? ThanhTien { get; set; }

    public bool? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaHdbs")]
    [InverseProperty("ChiTietHoaDonThuBoSungs")]
    public virtual HoaDonThuBoSung? MaHdbsNavigation { get; set; }

    [ForeignKey("MaPhuLieuHc")]
    [InverseProperty("ChiTietHoaDonThuBoSungs")]
    public virtual PhuLieuHoaChat? MaPhuLieuHcNavigation { get; set; }
}
