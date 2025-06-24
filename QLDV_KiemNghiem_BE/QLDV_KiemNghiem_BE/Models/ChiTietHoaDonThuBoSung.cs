using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ChiTietHoaDonThuBoSung")]
public partial class ChiTietHoaDonThuBoSung
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaHDBS")]
    [StringLength(50)]
    public string? MaHdbs { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    public int? SoLuong { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? DonGia { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? ThanhTien { get; set; }

    public bool? TrangThai { get; set; }

    [Column("MaDM_PLHC")]
    [StringLength(50)]
    public string? MaDmPlhc { get; set; }

    [ForeignKey("MaDmPlhc")]
    [InverseProperty("ChiTietHoaDonThuBoSungs")]
    public virtual DmPhuLieuHoaChat? MaDmPlhcNavigation { get; set; }

    [ForeignKey("MaHdbs")]
    [InverseProperty("ChiTietHoaDonThuBoSungs")]
    public virtual HoaDonThuBoSung? MaHdbsNavigation { get; set; }
}
