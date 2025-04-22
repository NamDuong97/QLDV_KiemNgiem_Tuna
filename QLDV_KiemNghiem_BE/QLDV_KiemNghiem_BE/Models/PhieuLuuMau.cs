using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuLuuMau")]
public partial class PhieuLuuMau
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuLuu { get; set; }

    [StringLength(50)]
    public string? MaMau { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoLuong { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianLuu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LuuDenNgay { get; set; }

    [StringLength(50)]
    public string? ManvLuu { get; set; }

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

    [ForeignKey("MaMau")]
    [InverseProperty("PhieuLuuMaus")]
    public virtual Mau? MaMauNavigation { get; set; }

    [ForeignKey("ManvLuu")]
    [InverseProperty("PhieuLuuMaus")]
    public virtual NhanVien? ManvLuuNavigation { get; set; }
}
