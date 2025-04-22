using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("LichSuPhanCong")]
public partial class LichSuPhanCong
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhanCongNoiBo { get; set; }

    [StringLength(50)]
    public string? ManvCu { get; set; }

    [StringLength(50)]
    public string? ManvMoi { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LamTu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? LamToi { get; set; }

    [StringLength(50)]
    public string? ManvPhanCong { get; set; }

    [StringLength(200)]
    public string? TennvPhanCong { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianPhanCongLai { get; set; }

    [StringLength(100)]
    public string? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaPhanCongNoiBo")]
    [InverseProperty("LichSuPhanCongs")]
    public virtual PhanCongNoiBo? MaPhanCongNoiBoNavigation { get; set; }

    [ForeignKey("ManvCu")]
    [InverseProperty("LichSuPhanCongManvCuNavigations")]
    public virtual NhanVien? ManvCuNavigation { get; set; }

    [ForeignKey("ManvMoi")]
    [InverseProperty("LichSuPhanCongManvMoiNavigations")]
    public virtual NhanVien? ManvMoiNavigation { get; set; }

    [ForeignKey("ManvPhanCong")]
    [InverseProperty("LichSuPhanCongManvPhanCongNavigations")]
    public virtual NhanVien? ManvPhanCongNavigation { get; set; }
}
