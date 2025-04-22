using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("Loai_PhuLieu_HoaChat")]
public partial class LoaiPhuLieuHoaChat
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaLoaiPLHC")]
    [StringLength(50)]
    public string? MaLoaiPlhc { get; set; }

    [Column("TenLoaiPLHC")]
    [StringLength(200)]
    public string? TenLoaiPlhc { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [InverseProperty("MaLoaiPlhcNavigation")]
    public virtual ICollection<PhuLieuHoaChat> PhuLieuHoaChats { get; set; } = new List<PhuLieuHoaChat>();
}
