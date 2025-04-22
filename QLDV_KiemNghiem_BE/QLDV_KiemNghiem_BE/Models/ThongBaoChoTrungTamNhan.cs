using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("ThongBaoChoTrungTam_Nhan")]
public partial class ThongBaoChoTrungTamNhan
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("ThongBaoID")]
    [StringLength(50)]
    public string? ThongBaoId { get; set; }

    [Column("NhanVienID")]
    [StringLength(50)]
    public string? NhanVienId { get; set; }

    public bool? DaXem { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianXem { get; set; }

    [ForeignKey("NhanVienId")]
    [InverseProperty("ThongBaoChoTrungTamNhans")]
    public virtual NhanVien? NhanVien { get; set; }

    [ForeignKey("ThongBaoId")]
    [InverseProperty("ThongBaoChoTrungTamNhans")]
    public virtual ThongBaoChoTrungTam? ThongBao { get; set; }
}
