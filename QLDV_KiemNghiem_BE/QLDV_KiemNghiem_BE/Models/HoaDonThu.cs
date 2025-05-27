using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("HoaDonThu")]
public partial class HoaDonThu
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaHD")]
    [StringLength(50)]
    public string? MaHd { get; set; }

    [StringLength(50)]
    public string? MaPhieuDangKy { get; set; }

    [StringLength(50)]
    public string? ManvXuLy { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? TongTien { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayLap { get; set; }

    [StringLength(500)]
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

    [Column("SoDKPT")]
    [StringLength(50)]
    public string? SoDkpt { get; set; }

    [InverseProperty("MaHdNavigation")]
    public virtual ICollection<ChiTietHoaDonThu> ChiTietHoaDonThus { get; set; } = new List<ChiTietHoaDonThu>();

    [InverseProperty("MaHdNavigation")]
    public virtual ICollection<HoaDonThuBoSung> HoaDonThuBoSungs { get; set; } = new List<HoaDonThuBoSung>();

    [InverseProperty("MaHdNavigation")]
    public virtual ICollection<Lkct> Lkcts { get; set; } = new List<Lkct>();

    [ForeignKey("MaPhieuDangKy")]
    [InverseProperty("HoaDonThus")]
    public virtual PhieuDangKy? MaPhieuDangKyNavigation { get; set; }

    [ForeignKey("ManvXuLy")]
    [InverseProperty("HoaDonThus")]
    public virtual NhanVien? ManvXuLyNavigation { get; set; }
}
