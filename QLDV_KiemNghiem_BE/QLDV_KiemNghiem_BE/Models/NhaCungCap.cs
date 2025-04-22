using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("NhaCungCap")]
public partial class NhaCungCap
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaNhaCungCap { get; set; }

    [StringLength(200)]
    public string? TenNhaCungCap { get; set; }

    [StringLength(200)]
    public string? DiaChi { get; set; }

    [StringLength(50)]
    public string? SoDienThoai { get; set; }

    public bool? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [InverseProperty("MaNhaCungCapNavigation")]
    public virtual ICollection<HoaDonMuaPlhc> HoaDonMuaPlhcs { get; set; } = new List<HoaDonMuaPlhc>();

    [InverseProperty("MaNhaCungCapNavigation")]
    public virtual ICollection<PhuLieuHoaChat> PhuLieuHoaChats { get; set; } = new List<PhuLieuHoaChat>();
}
