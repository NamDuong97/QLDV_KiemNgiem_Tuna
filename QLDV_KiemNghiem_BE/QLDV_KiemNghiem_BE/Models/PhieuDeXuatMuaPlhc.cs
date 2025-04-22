using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuDeXuatMuaPLHC")]
public partial class PhieuDeXuatMuaPlhc
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuDeXuatMua { get; set; }

    [StringLength(50)]
    public string? ManvLap { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayLap { get; set; }

    public string? GhiChu { get; set; }

    [StringLength(50)]
    public string? ManvDuyet { get; set; }

    public string? LyDoTuChoi { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianTuChoi { get; set; }

    [StringLength(200)]
    public string? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("ManvDuyet")]
    [InverseProperty("PhieuDeXuatMuaPlhcManvDuyetNavigations")]
    public virtual NhanVien? ManvDuyetNavigation { get; set; }

    [ForeignKey("ManvLap")]
    [InverseProperty("PhieuDeXuatMuaPlhcManvLapNavigations")]
    public virtual NhanVien? ManvLapNavigation { get; set; }

    [InverseProperty("MaPhieuDeXuatMuaNavigation")]
    public virtual ICollection<PhieuDeXuatMuaPlhcchiTiet> PhieuDeXuatMuaPlhcchiTiets { get; set; } = new List<PhieuDeXuatMuaPlhcchiTiet>();
}
