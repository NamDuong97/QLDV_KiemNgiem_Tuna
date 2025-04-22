using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("TaiKhoan_KhachHang")]
public partial class TaiKhoanKhachHang
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

    [Column("MaKH")]
    [StringLength(50)]
    public string? MaKh { get; set; }

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

    [ForeignKey("MaKh")]
    [InverseProperty("TaiKhoanKhachHangs")]
    public virtual KhachHang? MaKhNavigation { get; set; }
}
