using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuDangKy")]
public partial class PhieuDangKy
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [Column("MaKH")]
    [StringLength(50)]
    public string? MaKh { get; set; }

    [StringLength(50)]
    public string? ManvNhanMau { get; set; }

    [StringLength(200)]
    public string? NguoiNhanMau { get; set; }

    [StringLength(500)]
    public string? DonViGuiMau { get; set; }

    [StringLength(200)]
    public string? NguoiGuiMau { get; set; }

    [StringLength(50)]
    public string? SoDienThoai { get; set; }

    [StringLength(50)]
    public string? Email { get; set; }

    [StringLength(500)]
    public string? DiaChiLienHe { get; set; }

    [StringLength(50)]
    public string? HinhThucGuiMau { get; set; }

    [Column("HinhThucTraKQ")]
    [StringLength(50)]
    public string? HinhThucTraKq { get; set; }

    [StringLength(500)]
    public string? DiaChiGiaoMau { get; set; }

    [Column("TrangThaiID")]
    [StringLength(50)]
    public string? TrangThaiId { get; set; }

    public bool? KetQuaTiengAnh { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayGiaoMau { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayThucHien { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [Column("SoDKPT")]
    [StringLength(50)]
    public string? SoDkpt { get; set; }

    [StringLength(50)]
    public string? ManvSoDuyet { get; set; }

    [Column("MaBLDDuyet")]
    [StringLength(50)]
    public string? MaBldduyet { get; set; }

    [StringLength(500)]
    public string? NoiDungDuyetSoBo { get; set; }

    [StringLength(500)]
    public string? NoiDungTongDuyet { get; set; }

    [InverseProperty("MaPhieuDangKyNavigation")]
    public virtual ICollection<HoaDonThu> HoaDonThus { get; set; } = new List<HoaDonThu>();

    [ForeignKey("MaBldduyet")]
    [InverseProperty("PhieuDangKyMaBldduyetNavigations")]
    public virtual NhanVien? MaBldduyetNavigation { get; set; }

    [ForeignKey("MaKh")]
    [InverseProperty("PhieuDangKies")]
    public virtual KhachHang? MaKhNavigation { get; set; }

    [ForeignKey("ManvNhanMau")]
    [InverseProperty("PhieuDangKyManvNhanMauNavigations")]
    public virtual NhanVien? ManvNhanMauNavigation { get; set; }

    [ForeignKey("ManvSoDuyet")]
    [InverseProperty("PhieuDangKyManvSoDuyetNavigations")]
    public virtual NhanVien? ManvSoDuyetNavigation { get; set; }

    [InverseProperty("MaPhieuDangKyNavigation")]
    public virtual ICollection<PhieuDangKyMau> PhieuDangKyMaus { get; set; } = new List<PhieuDangKyMau>();

    [ForeignKey("TrangThaiId")]
    [InverseProperty("PhieuDangKies")]
    public virtual TrangThaiPhieuDk? TrangThai { get; set; }
}
