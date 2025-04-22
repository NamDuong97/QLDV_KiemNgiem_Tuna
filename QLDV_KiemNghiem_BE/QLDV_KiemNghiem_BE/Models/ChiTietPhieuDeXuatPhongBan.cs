using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Keyless]
[Table("ChiTietPhieuDeXuatPhongBan")]
public partial class ChiTietPhieuDeXuatPhongBan
{
    [Column("MaID")]
    [StringLength(50)]
    public string? MaId { get; set; }

    [StringLength(50)]
    public string? MaPhieuDeXuat { get; set; }

    [StringLength(50)]
    public string? MaMau { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? ThoiGianHoanThanh { get; set; }

    [StringLength(50)]
    public string? MaTieuChuan { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SoLuong { get; set; }

    [StringLength(50)]
    public string? Solo { get; set; }

    [StringLength(200)]
    public string? DieuKienBaoQuan { get; set; }

    [StringLength(200)]
    public string? DonViSanXuat { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySanXuat { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? HanSuDung { get; set; }

    public string? YeuCauKiemNghiem { get; set; }

    [StringLength(500)]
    public string? TinhTrangMau { get; set; }

    public bool? LuuMau { get; set; }

    public bool? XuatKetQua { get; set; }

    [StringLength(50)]
    public string? TrangThaiNhanMau { get; set; }

    [StringLength(50)]
    public string? GhiChu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [ForeignKey("MaMau")]
    public virtual Mau? MaMauNavigation { get; set; }

    [ForeignKey("MaPhieuDeXuat")]
    public virtual PhieuDeXuatPhongBan? MaPhieuDeXuatNavigation { get; set; }

    [ForeignKey("MaTieuChuan")]
    public virtual TieuChuan? MaTieuChuanNavigation { get; set; }
}
