using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ThongBaoNoiBo_Nhan")]
public partial class ThongBaoNoiBoNhan
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("ThongBaoNoiBoID")]
    [StringLength(50)]
    public string? ThongBaoNoiBoId { get; set; }

    [Column("NhanVienID")]
    [StringLength(50)]
    public string? NhanVienId { get; set; }

    public bool? DaXem { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianXem { get; set; }

    [ForeignKey("NhanVienId")]
    [InverseProperty("ThongBaoNoiBoNhans")]
    public virtual NhanVien? NhanVien { get; set; }

    [ForeignKey("ThongBaoNoiBoId")]
    [InverseProperty("ThongBaoNoiBoNhans")]
    public virtual ThongBaoNoiBo? ThongBaoNoiBo { get; set; }
}
