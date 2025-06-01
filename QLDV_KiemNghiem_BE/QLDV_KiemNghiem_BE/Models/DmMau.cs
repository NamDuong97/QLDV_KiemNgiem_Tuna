using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("Dm_Mau")]
public partial class DmMau
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? TenMau { get; set; }

    [StringLength(50)]
    public string? MaLoaiMau { get; set; }

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

    [ForeignKey("MaLoaiMau")]
    [InverseProperty("DmMaus")]
    public virtual LoaiMau? MaLoaiMauNavigation { get; set; }

    [InverseProperty("MaDmMauNavigation")]
    public virtual ICollection<MauTieuChuan> MauTieuChuans { get; set; } = new List<MauTieuChuan>();

    [InverseProperty("MaDmMauNavigation")]
    public virtual ICollection<PhieuDangKyMau> PhieuDangKyMaus { get; set; } = new List<PhieuDangKyMau>();
}
