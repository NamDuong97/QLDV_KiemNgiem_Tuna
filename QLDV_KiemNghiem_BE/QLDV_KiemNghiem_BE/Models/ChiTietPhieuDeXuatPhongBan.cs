using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ChiTietPhieuDeXuatPhongBan")]
public partial class ChiTietPhieuDeXuatPhongBan
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

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

    public int? TrangThai { get; set; }

    public string? YeuCauKiemNghiem { get; set; }

    [ForeignKey("MaPdkMau")]
    [InverseProperty("ChiTietPhieuDeXuatPhongBans")]
    public virtual PhieuDangKyMau? MaPdkMauNavigation { get; set; }

    [ForeignKey("MaPhieuDeXuat")]
    [InverseProperty("ChiTietPhieuDeXuatPhongBans")]
    public virtual PhieuDeXuatPhongBan? MaPhieuDeXuatNavigation { get; set; }

    [ForeignKey("ManvTuChoi")]
    [InverseProperty("ChiTietPhieuDeXuatPhongBans")]
    public virtual NhanVien? ManvTuChoiNavigation { get; set; }
}
