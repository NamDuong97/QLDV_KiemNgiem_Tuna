using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Keyless]
[Table("ChiTietPhieuDeXuatPhongBan")]
public partial class ChiTietPhieuDeXuatPhongBan
{
    [Column("MaID")]
    [StringLength(50)]
    public string? MaId { get; set; }

    [StringLength(50)]
    public string? MaPhieuDeXuat { get; set; }

    [Column("MaPDK_Mau")]
    [StringLength(50)]
    public string? MaPdkMau { get; set; }

    [StringLength(50)]
    public string? GhiChu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTuChoi { get; set; }

    [StringLength(500)]
    public string? LyDoTuChoi { get; set; }

    [StringLength(50)]
    public string? ManvTuChoi { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayThucHienKiemNghiem { get; set; }

    [ForeignKey("MaPdkMau")]
    public virtual PhieuDangKyMau? MaPdkMauNavigation { get; set; }

    [ForeignKey("MaPhieuDeXuat")]
    public virtual PhieuDeXuatPhongBan? MaPhieuDeXuatNavigation { get; set; }

    [ForeignKey("ManvTuChoi")]
    public virtual NhanVien? ManvTuChoiNavigation { get; set; }
}
