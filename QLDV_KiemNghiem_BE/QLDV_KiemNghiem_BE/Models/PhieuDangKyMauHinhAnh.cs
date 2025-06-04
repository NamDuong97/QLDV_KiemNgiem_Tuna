using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuDangKy_Mau_HinhAnh")]
public partial class PhieuDangKyMauHinhAnh
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaMau { get; set; }

    [StringLength(50)]
    public string? Ten { get; set; }

    [StringLength(50)]
    public string? DinhDang { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [StringLength(50)]
    public string? LoaiAnh { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [Column("Path_Img")]
    [StringLength(500)]
    public string? PathImg { get; set; }

    public bool? IsDel { get; set; }

    [ForeignKey("MaMau")]
    [InverseProperty("PhieuDangKyMauHinhAnhs")]
    public virtual PhieuDangKyMau? MaMauNavigation { get; set; }
}
