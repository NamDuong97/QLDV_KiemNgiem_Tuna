using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ThongBaoNoiBo_Nhom")]
public partial class ThongBaoNoiBoNhom
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("ThongBaoNoiBoID")]
    [StringLength(50)]
    public string? ThongBaoNoiBoId { get; set; }

    [StringLength(50)]
    public string? LoaiDoiTuong { get; set; }

    [Column("DoiTuongID")]
    [StringLength(50)]
    public string? DoiTuongId { get; set; }

    [ForeignKey("ThongBaoNoiBoId")]
    [InverseProperty("ThongBaoNoiBoNhoms")]
    public virtual ThongBaoNoiBo? ThongBaoNoiBo { get; set; }
}
