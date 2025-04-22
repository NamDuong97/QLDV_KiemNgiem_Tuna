using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ThongBaoChoTrungTam_Nhom")]
public partial class ThongBaoChoTrungTamNhom
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("ThongBaoID")]
    [StringLength(50)]
    public string? ThongBaoId { get; set; }

    [StringLength(50)]
    public string? LoaiDoiTuong { get; set; }

    [Column("DoiTuongID")]
    [StringLength(50)]
    public string? DoiTuongId { get; set; }

    [ForeignKey("ThongBaoId")]
    [InverseProperty("ThongBaoChoTrungTamNhoms")]
    public virtual ThongBaoChoTrungTam? ThongBao { get; set; }
}
