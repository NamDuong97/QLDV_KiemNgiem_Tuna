using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ThongBaoNoiBo")]
public partial class ThongBaoNoiBo
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(100)]
    public string? LoaiPhieu { get; set; }

    public int? MucDo { get; set; }

    [StringLength(50)]
    public string? MaPhieu { get; set; }

    [StringLength(200)]
    public string? TieuDe { get; set; }

    public string? NoiDung { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayGui { get; set; }

    [StringLength(50)]
    public string? ManvGui { get; set; }

    [StringLength(50)]
    public string? LoaiThongBao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("ManvGui")]
    [InverseProperty("ThongBaoNoiBos")]
    public virtual NhanVien? ManvGuiNavigation { get; set; }

    [InverseProperty("ThongBaoNoiBo")]
    public virtual ICollection<ThongBaoNoiBoNhan> ThongBaoNoiBoNhans { get; set; } = new List<ThongBaoNoiBoNhan>();

    [InverseProperty("ThongBaoNoiBo")]
    public virtual ICollection<ThongBaoNoiBoNhom> ThongBaoNoiBoNhoms { get; set; } = new List<ThongBaoNoiBoNhom>();
}
