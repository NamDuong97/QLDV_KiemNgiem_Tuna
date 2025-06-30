using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuPhanTichKetQuaChiTiet")]
public partial class PhieuPhanTichKetQuaChiTiet
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuKetQua { get; set; }

    [StringLength(50)]
    public string? MaChiTieu { get; set; }

    [StringLength(500)]
    public string? TenChiTieu { get; set; }

    [StringLength(500)]
    public string? KetQua { get; set; }

    [StringLength(50)]
    public string? DonVi { get; set; }

    [StringLength(500)]
    public string? GhiChu { get; set; }

    [StringLength(100)]
    public string? TrangThai { get; set; }

    [StringLength(200)]
    public string? MucChatLuong { get; set; }

    public bool? Active { get; set; }

    [ForeignKey("MaChiTieu")]
    [InverseProperty("PhieuPhanTichKetQuaChiTiets")]
    public virtual ChiTieu? MaChiTieuNavigation { get; set; }

    [ForeignKey("MaPhieuKetQua")]
    [InverseProperty("PhieuPhanTichKetQuaChiTiets")]
    public virtual PhieuPhanTichKetQua? MaPhieuKetQuaNavigation { get; set; }
}
