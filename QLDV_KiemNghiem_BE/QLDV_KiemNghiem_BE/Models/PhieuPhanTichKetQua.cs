using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuPhanTichKetQua")]
public partial class PhieuPhanTichKetQua
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuKetQua { get; set; }

    [Column("MaPDK_Mau")]
    [StringLength(50)]
    public string? MaPdkMau { get; set; }

    [StringLength(50)]
    public string? ManvLap { get; set; }

    [StringLength(50)]
    public string? ManvKiemTra { get; set; }

    [StringLength(50)]
    public string? MaKhoa { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    public int? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    [StringLength(50)]
    public string? MabldDuyet { get; set; }

    public string? NoiDungDuyetSoBo { get; set; }

    public string? NoiDungDuyetTongBo { get; set; }

    public bool? Active { get; set; }

    [StringLength(500)]
    public string? NoiDungPhanHoiOfCustomer { get; set; }

    [ForeignKey("MaKhoa")]
    [InverseProperty("PhieuPhanTichKetQuas")]
    public virtual Khoa? MaKhoaNavigation { get; set; }

    [ForeignKey("MaPdkMau")]
    [InverseProperty("PhieuPhanTichKetQuas")]
    public virtual PhieuDangKyMau? MaPdkMauNavigation { get; set; }

    [ForeignKey("MabldDuyet")]
    [InverseProperty("PhieuPhanTichKetQuaMabldDuyetNavigations")]
    public virtual NhanVien? MabldDuyetNavigation { get; set; }

    [ForeignKey("ManvKiemTra")]
    [InverseProperty("PhieuPhanTichKetQuaManvKiemTraNavigations")]
    public virtual NhanVien? ManvKiemTraNavigation { get; set; }

    [ForeignKey("ManvLap")]
    [InverseProperty("PhieuPhanTichKetQuaManvLapNavigations")]
    public virtual NhanVien? ManvLapNavigation { get; set; }

    [InverseProperty("MaPhieuKetQuaNavigation")]
    public virtual ICollection<PhieuPhanTichKetQuaChiTiet> PhieuPhanTichKetQuaChiTiets { get; set; } = new List<PhieuPhanTichKetQuaChiTiet>();
}
