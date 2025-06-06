using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("LoaiDichVu")]
public partial class LoaiDichVu
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaLoaiDV")]
    [StringLength(50)]
    public string? MaLoaiDv { get; set; }

    [StringLength(200)]
    public string? TenDichVu { get; set; }

    [StringLength(200)]
    public string? GhiChu { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(50)]
    public decimal? ThoiGianMongMuonHoanThanh { get; set; }

    [InverseProperty("MaLoaiDvNavigation")]
    public virtual ICollection<PhieuDangKyMau> PhieuDangKyMaus { get; set; } = new List<PhieuDangKyMau>();
}
