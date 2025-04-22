using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ThongBaoChoTrungTam")]
public partial class ThongBaoChoTrungTam
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

    [ForeignKey("MaKh")]
    [InverseProperty("ThongBaoChoTrungTams")]
    public virtual KhachHang? MaKhNavigation { get; set; }

    [InverseProperty("ThongBao")]
    public virtual ICollection<ThongBaoChoTrungTamNhan> ThongBaoChoTrungTamNhans { get; set; } = new List<ThongBaoChoTrungTamNhan>();

    [InverseProperty("ThongBao")]
    public virtual ICollection<ThongBaoChoTrungTamNhom> ThongBaoChoTrungTamNhoms { get; set; } = new List<ThongBaoChoTrungTamNhom>();
}
