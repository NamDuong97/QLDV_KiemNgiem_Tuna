using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("KhachHang")]
[Index("Email", Name = "uni_email", IsUnique = true)]
public partial class KhachHang
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaKH")]
    [StringLength(50)]
    public string? MaKh { get; set; }

    [Column("TenKH")]
    [StringLength(200)]
    public string? TenKh { get; set; }

    [StringLength(500)]
    public string? DiaChi { get; set; }

    [StringLength(200)]
    public string? TenNguoiDaiDien { get; set; }

    [StringLength(50)]
    public string? SoDienThoai { get; set; }

    [StringLength(50)]
    public string? Email { get; set; }

    public int? ThanThien { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(200)]
    public string? MatKhau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySuaMatKhau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayHetHanMatKhau { get; set; }

    public bool IsEmailVerify { get; set; } = false;

    [StringLength(200)]
    public string? TockenXacMinh { get; set; }

    [StringLength(100)]
    public string? RefreshToken { get; set; }
 
    public DateTime? RefreshTokenExpiryTime { get; set; }

    [InverseProperty("MaKhNavigation")]
    public virtual ICollection<PhieuDangKy> PhieuDangKies { get; set; } = new List<PhieuDangKy>();

    [InverseProperty("MaKhNavigation")]
    public virtual ICollection<ThongBaoChoKhachHang> ThongBaoChoKhachHangs { get; set; } = new List<ThongBaoChoKhachHang>();

    [InverseProperty("MaKhNavigation")]
    public virtual ICollection<ThongBaoChoTrungTam> ThongBaoChoTrungTams { get; set; } = new List<ThongBaoChoTrungTam>();
}
