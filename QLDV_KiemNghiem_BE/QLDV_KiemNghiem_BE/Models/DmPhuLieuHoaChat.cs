using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("Dm_PhuLieu_HoaChat")]
public partial class DmPhuLieuHoaChat
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaDM_PLHC")]
    [StringLength(50)]
    public string? MaDmPlhc { get; set; }

    [Column("TenDM_PLHC")]
    [StringLength(200)]
    public string? TenDmPlhc { get; set; }

    public bool? TrangThai { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(200)]
    public string? TenHienThi { get; set; }

    [Column(TypeName = "decimal(18, 2)")]
    public decimal? NongDo { get; set; }

    [StringLength(50)]
    public string? DonViNongDo { get; set; }

    [StringLength(200)]
    public string? DieuKienBaoQuan { get; set; }

    [InverseProperty("MaDmPlhcNavigation")]
    public virtual ICollection<ChiTietHoaDonThuBoSung> ChiTietHoaDonThuBoSungs { get; set; } = new List<ChiTietHoaDonThuBoSung>();

    [InverseProperty("MaDmPlhcNavigation")]
    public virtual ICollection<ChiTietPhieuDuTru> ChiTietPhieuDuTrus { get; set; } = new List<ChiTietPhieuDuTru>();

    [InverseProperty("MaDmPlhcNavigation")]
    public virtual ICollection<ChiTietPhieuXuatKho> ChiTietPhieuXuatKhos { get; set; } = new List<ChiTietPhieuXuatKho>();

    [InverseProperty("MaDmPlhcNavigation")]
    public virtual ICollection<HoaDonMuaPlhcchiTiet> HoaDonMuaPlhcchiTiets { get; set; } = new List<HoaDonMuaPlhcchiTiet>();

    [InverseProperty("MaPlhcNavigation")]
    public virtual ICollection<PhieuDangKyPhuLieuHoaChat> PhieuDangKyPhuLieuHoaChats { get; set; } = new List<PhieuDangKyPhuLieuHoaChat>();

    [InverseProperty("MaDmPlhcNavigation")]
    public virtual ICollection<PhieuNhapKhoChiTiet> PhieuNhapKhoChiTiets { get; set; } = new List<PhieuNhapKhoChiTiet>();

    [InverseProperty("MaDmPlhcNavigation")]
    public virtual ICollection<PhuLieuHoaChatKho> PhuLieuHoaChatKhos { get; set; } = new List<PhuLieuHoaChatKho>();
}
