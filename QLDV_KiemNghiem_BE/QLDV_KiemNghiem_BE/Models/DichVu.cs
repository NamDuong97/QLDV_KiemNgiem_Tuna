using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("DichVu")]
public partial class DichVu
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaDV")]
    [StringLength(50)]
    public string? MaDv { get; set; }

    [StringLength(50)]
    public string? MaLoaidv { get; set; }

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

    [InverseProperty("MadvNavigation")]
    public virtual ICollection<ChiTietPhieuDangKy> ChiTietPhieuDangKies { get; set; } = new List<ChiTietPhieuDangKy>();

    [ForeignKey("MaLoaidv")]
    [InverseProperty("DichVus")]
    public virtual LoaiDichVu? MaLoaidvNavigation { get; set; }

    [InverseProperty("MadvNavigation")]
    public virtual ICollection<Mau> Maus { get; set; } = new List<Mau>();
}
