using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("Mau_TieuChuan")]
public partial class MauTieuChuan
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaDmMau { get; set; }

    [StringLength(50)]
    public string? MaTieuChuan { get; set; }

    [StringLength(500)]
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

    [ForeignKey("MaDmMau")]
    [InverseProperty("MauTieuChuans")]
    public virtual DmMau? MaDmMauNavigation { get; set; }

    [ForeignKey("MaTieuChuan")]
    [InverseProperty("MauTieuChuans")]
    public virtual TieuChuan? MaTieuChuanNavigation { get; set; }

    [InverseProperty("MaMauTieuChuanNavigation")]
    public virtual ICollection<MauTieuChuanChiTieu> MauTieuChuanChiTieus { get; set; } = new List<MauTieuChuanChiTieu>();
}
