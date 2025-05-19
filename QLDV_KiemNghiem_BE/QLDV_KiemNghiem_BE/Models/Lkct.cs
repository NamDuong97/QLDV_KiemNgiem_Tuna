using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("LKCT")]
public partial class Lkct
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieu { get; set; }

    [Column("NoiDungCT")]
    public string? NoiDungCt { get; set; }

    [Column("NgayTaoCT", TypeName = "datetime")]
    public DateTime? NgayTaoCt { get; set; }

    [Column("MaHD")]
    [StringLength(50)]
    public string? MaHd { get; set; }

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

    [StringLength(50)]
    public string? ManvTao { get; set; }

    [ForeignKey("MaHd")]
    [InverseProperty("Lkcts")]
    public virtual HoaDonThu? MaHdNavigation { get; set; }

    [ForeignKey("ManvTao")]
    [InverseProperty("Lkcts")]
    public virtual NhanVien? ManvTaoNavigation { get; set; }

    [InverseProperty("MaLienKetChungTuNavigation")]
    public virtual ICollection<PhieuThu> PhieuThus { get; set; } = new List<PhieuThu>();
}
