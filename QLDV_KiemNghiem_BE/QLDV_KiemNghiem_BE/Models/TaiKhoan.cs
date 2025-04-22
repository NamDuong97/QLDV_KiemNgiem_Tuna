using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("TaiKhoan")]
public partial class TaiKhoan
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaTK")]
    [StringLength(50)]
    public string? MaTk { get; set; }

    [StringLength(200)]
    public string? TenTaiKhoan { get; set; }

    [StringLength(200)]
    public string? MatKhau { get; set; }

    [StringLength(50)]
    public string? MaKhoa { get; set; }

    [StringLength(50)]
    public string? MaBoPhan { get; set; }

    [StringLength(50)]
    public string? MaChucVu { get; set; }

    [Column("MaLoaiTK")]
    [StringLength(50)]
    public string? MaLoaiTk { get; set; }

    [StringLength(50)]
    public string? Manv { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySuaMatKhau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayHetHanMatKhau { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaBoPhan")]
    [InverseProperty("TaiKhoans")]
    public virtual BoPhan? MaBoPhanNavigation { get; set; }

    [ForeignKey("MaChucVu")]
    [InverseProperty("TaiKhoans")]
    public virtual ChucVu? MaChucVuNavigation { get; set; }

    [ForeignKey("MaKhoa")]
    [InverseProperty("TaiKhoans")]
    public virtual Khoa? MaKhoaNavigation { get; set; }

    [ForeignKey("MaLoaiTk")]
    [InverseProperty("TaiKhoans")]
    public virtual LoaiTaiKhoan? MaLoaiTkNavigation { get; set; }

    [ForeignKey("Manv")]
    [InverseProperty("TaiKhoans")]
    public virtual NhanVien? ManvNavigation { get; set; }
}
