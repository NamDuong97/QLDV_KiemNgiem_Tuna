using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("TieuChuan")]
public partial class TieuChuan
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(200)]
    public string? TenTieuChuan { get; set; }

    public string? MoTa { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayBanHanh { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayHieuLuc { get; set; }

    [StringLength(200)]
    public string? CoQuanBanHanh { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(200)]
    public string? PhienBan { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(50)]
    public string? MaTieuChuan { get; set; }

    [StringLength(50)]
    public string? MaDuocDien { get; set; }

    [ForeignKey("MaDuocDien")]
    [InverseProperty("TieuChuans")]
    public virtual DuocDien? MaDuocDienNavigation { get; set; }

    [InverseProperty("MaTieuChuanNavigation")]
    public virtual ICollection<Mau> Maus { get; set; } = new List<Mau>();

    [InverseProperty("MaTieuChuanNavigation")]
    public virtual ICollection<TieuChuanChiTieu> TieuChuanChiTieus { get; set; } = new List<TieuChuanChiTieu>();
}
