using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuDuTru")]
public partial class PhieuDuTru
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuDuTru { get; set; }

    [StringLength(50)]
    public string? ManvLapPhieu { get; set; }

    [Column("MaPDK_Mau")]
    [StringLength(50)]
    public string? MaPdkMau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayLap { get; set; }

    [StringLength(50)]
    public string? MaKhoa { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [InverseProperty("MaPhieuDuTruNavigation")]
    public virtual ICollection<ChiTietPhieuDuTru> ChiTietPhieuDuTrus { get; set; } = new List<ChiTietPhieuDuTru>();

    [ForeignKey("MaKhoa")]
    [InverseProperty("PhieuDuTrus")]
    public virtual Khoa? MaKhoaNavigation { get; set; }

    [ForeignKey("MaPdkMau")]
    [InverseProperty("PhieuDuTrus")]
    public virtual PhieuDangKyMau? MaPdkMauNavigation { get; set; }

    [ForeignKey("ManvLapPhieu")]
    [InverseProperty("PhieuDuTrus")]
    public virtual NhanVien? ManvLapPhieuNavigation { get; set; }

    [InverseProperty("MaPhieuDuTruNavigation")]
    public virtual ICollection<PhieuXuatKho> PhieuXuatKhos { get; set; } = new List<PhieuXuatKho>();
}
