using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuPhanTichKetQua")]
public partial class PhieuPhanTichKetQua
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuKetQua { get; set; }

    [StringLength(50)]
    public string? MaMau { get; set; }

    [StringLength(500)]
    public string? TenMau { get; set; }

    [StringLength(50)]
    public string? ManvLap { get; set; }

    [StringLength(50)]
    public string? ManvKiemTra { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayNhanMau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayKiemThu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTraKetQua { get; set; }

    public bool? LuuMau { get; set; }

    [StringLength(50)]
    public string? MaKhoa { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

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

    [ForeignKey("MaKhoa")]
    [InverseProperty("PhieuPhanTichKetQuas")]
    public virtual Khoa? MaKhoaNavigation { get; set; }

    [ForeignKey("MaMau")]
    [InverseProperty("PhieuPhanTichKetQuas")]
    public virtual Mau? MaMauNavigation { get; set; }

    [ForeignKey("ManvKiemTra")]
    [InverseProperty("PhieuPhanTichKetQuaManvKiemTraNavigations")]
    public virtual NhanVien? ManvKiemTraNavigation { get; set; }

    [ForeignKey("ManvLap")]
    [InverseProperty("PhieuPhanTichKetQuaManvLapNavigations")]
    public virtual NhanVien? ManvLapNavigation { get; set; }
}
