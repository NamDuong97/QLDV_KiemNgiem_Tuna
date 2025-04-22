using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ThongBaoChoKhachHang")]
public partial class ThongBaoChoKhachHang
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    public int? MucDo { get; set; }

    [Column("MaKH")]
    [StringLength(50)]
    public string? MaKh { get; set; }

    [StringLength(50)]
    public string? MaPhieu { get; set; }

    [StringLength(200)]
    public string? TieuDe { get; set; }

    public string? NoiDung { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayGui { get; set; }

    public bool? DaXem { get; set; }

    [StringLength(50)]
    public string? ManvGui { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaKh")]
    [InverseProperty("ThongBaoChoKhachHangs")]
    public virtual KhachHang? MaKhNavigation { get; set; }

    [ForeignKey("ManvGui")]
    [InverseProperty("ThongBaoChoKhachHangs")]
    public virtual NhanVien? ManvGuiNavigation { get; set; }
}
