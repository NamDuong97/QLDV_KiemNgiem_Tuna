using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("LichSuPhanCongMauChoKhoa")]
public partial class LichSuPhanCongMauChoKhoa
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaMau { get; set; }

    [StringLength(50)]
    public string? MaKhoa { get; set; }

    [StringLength(50)]
    public string? ManvHuyMau { get; set; }

    [StringLength(50)]
    public string? ManvPhanCong { get; set; }

    [StringLength(50)]
    public string? ManvDuyet { get; set; }

    [StringLength(500)]
    public string? NoiDungHuyMau { get; set; }

    [StringLength(500)]
    public string? NoiDungDuyet { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianPhanCong { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianHuyMau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianDuyetHuy { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    public int? TrangThai { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [ForeignKey("MaKhoa")]
    [InverseProperty("LichSuPhanCongMauChoKhoas")]
    public virtual Khoa? MaKhoaNavigation { get; set; }

    [ForeignKey("MaMau")]
    [InverseProperty("LichSuPhanCongMauChoKhoas")]
    public virtual PhieuDangKyMau? MaMauNavigation { get; set; }

    [ForeignKey("ManvDuyet")]
    [InverseProperty("LichSuPhanCongMauChoKhoaManvDuyetNavigations")]
    public virtual NhanVien? ManvDuyetNavigation { get; set; }

    [ForeignKey("ManvHuyMau")]
    [InverseProperty("LichSuPhanCongMauChoKhoaManvHuyMauNavigations")]
    public virtual NhanVien? ManvHuyMauNavigation { get; set; }

    [ForeignKey("ManvPhanCong")]
    [InverseProperty("LichSuPhanCongMauChoKhoaManvPhanCongNavigations")]
    public virtual NhanVien? ManvPhanCongNavigation { get; set; }
}
