using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("Khoa")]
public partial class Khoa
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaKhoa { get; set; }

    [StringLength(200)]
    public string? TenKhoa { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [InverseProperty("MaKhoaNavigation")]
    public virtual ICollection<NhanVien> NhanViens { get; set; } = new List<NhanVien>();

    [InverseProperty("MaKhoaTiepNhanNavigation")]
    public virtual ICollection<PhieuDeXuatPhongBan> PhieuDeXuatPhongBans { get; set; } = new List<PhieuDeXuatPhongBan>();

    [InverseProperty("MaKhoaNavigation")]
    public virtual ICollection<PhieuDuTru> PhieuDuTrus { get; set; } = new List<PhieuDuTru>();

    [InverseProperty("MaKhoaNavigation")]
    public virtual ICollection<PhieuPhanTichKetQua> PhieuPhanTichKetQuas { get; set; } = new List<PhieuPhanTichKetQua>();

    [InverseProperty("MaKhoaNavigation")]
    public virtual ICollection<TaiKhoan> TaiKhoans { get; set; } = new List<TaiKhoan>();
}
