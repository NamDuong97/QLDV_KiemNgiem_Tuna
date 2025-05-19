using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhuLieu_HoaChat_Kho")]
public partial class PhuLieuHoaChatKho
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaPLHC")]
    [StringLength(50)]
    public string? MaPlhc { get; set; }

    [Column("TenPLHC")]
    [StringLength(200)]
    public string? TenPlhc { get; set; }

    [Column("MaDM_PLHC")]
    [StringLength(50)]
    public string? MaDmPlhc { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [StringLength(200)]
    public string? DieuKienBaoQuan { get; set; }

    [StringLength(50)]
    public string? MaNhaCungCap { get; set; }

    [StringLength(200)]
    public string? TenNhaCungCap { get; set; }

    [StringLength(50)]
    public string? SoLo { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoLuong { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? DonGia { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayHetHan { get; set; }

    [Column("HamLuong_NongDo")]
    [StringLength(100)]
    public string? HamLuongNongDo { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? GiaHienTai { get; set; }

    [StringLength(500)]
    public string? MoTa { get; set; }

    [StringLength(50)]
    public string? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [InverseProperty("MaPlhcNavigation")]
    public virtual ICollection<ChiTietPhieuDeXuatMuaPlhc> ChiTietPhieuDeXuatMuaPlhcs { get; set; } = new List<ChiTietPhieuDeXuatMuaPlhc>();

    [ForeignKey("MaDmPlhc")]
    [InverseProperty("PhuLieuHoaChatKhos")]
    public virtual DmPhuLieuHoaChat? MaDmPlhcNavigation { get; set; }

    [ForeignKey("MaNhaCungCap")]
    [InverseProperty("PhuLieuHoaChatKhos")]
    public virtual NhaCungCap? MaNhaCungCapNavigation { get; set; }
}
