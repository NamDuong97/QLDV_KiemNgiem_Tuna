using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ChiTietHoaDonThu")]
public partial class ChiTietHoaDonThu
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaMau { get; set; }

    [Column("MaHD")]
    [StringLength(50)]
    public string? MaHd { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? ThanhTien { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    public bool? TrangThai { get; set; }

    [ForeignKey("MaHd")]
    [InverseProperty("ChiTietHoaDonThus")]
    public virtual HoaDonThu? MaHdNavigation { get; set; }

    [ForeignKey("MaMau")]
    [InverseProperty("ChiTietHoaDonThus")]
    public virtual PhieuDangKyMau? MaMauNavigation { get; set; }
}
