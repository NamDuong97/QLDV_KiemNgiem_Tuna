using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("HoaDonThuBoSung")]
public partial class HoaDonThuBoSung
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaHD")]
    [StringLength(50)]
    public string? MaHd { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? TongTien { get; set; }

    [StringLength(50)]
    public string? ManvLap { get; set; }

    [StringLength(50)]
    public string? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    public bool? Active { get; set; }

    [InverseProperty("MaHdbsNavigation")]
    public virtual ICollection<ChiTietHoaDonThuBoSung> ChiTietHoaDonThuBoSungs { get; set; } = new List<ChiTietHoaDonThuBoSung>();

    [ForeignKey("MaHd")]
    [InverseProperty("HoaDonThuBoSungs")]
    public virtual HoaDonThu? MaHdNavigation { get; set; }

    [ForeignKey("ManvLap")]
    [InverseProperty("HoaDonThuBoSungs")]
    public virtual NhanVien? ManvLapNavigation { get; set; }
}
