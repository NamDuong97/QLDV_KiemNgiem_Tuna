﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuDeXuatPhongBan")]
public partial class PhieuDeXuatPhongBan
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuDeXuat { get; set; }

    [StringLength(50)]
    public string MaKhoaTiepNhan { get; set; } = null!;

    [StringLength(50)]
    public string? ManvDeXuat { get; set; }

    [StringLength(50)]
    public string? ManvTiepNhan { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ThoiGianGiaoMau { get; set; }

    public int? TrangThai { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayTao { get; set; }

    [StringLength(50)]
    public string? NguoiTao { get; set; }

    [StringLength(50)]
    public string? NguoiSua { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgaySua { get; set; }

    public bool? Active { get; set; }

    [InverseProperty("MaPhieuDeXuatNavigation")]
    public virtual ICollection<ChiTietPhieuDeXuatPhongBan> ChiTietPhieuDeXuatPhongBans { get; set; } = new List<ChiTietPhieuDeXuatPhongBan>();

    [ForeignKey("MaKhoaTiepNhan")]
    [InverseProperty("PhieuDeXuatPhongBans")]
    public virtual Khoa MaKhoaTiepNhanNavigation { get; set; } = null!;

    [ForeignKey("ManvDeXuat")]
    [InverseProperty("PhieuDeXuatPhongBanManvDeXuatNavigations")]
    public virtual NhanVien? ManvDeXuatNavigation { get; set; }

    [ForeignKey("ManvTiepNhan")]
    [InverseProperty("PhieuDeXuatPhongBanManvTiepNhanNavigations")]
    public virtual NhanVien? ManvTiepNhanNavigation { get; set; }
}
