﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.Models;

[Table("PhieuDangKy_PhuLieuHoaChat")]
public partial class PhieuDangKyPhuLieuHoaChat
{
    [Key]
    [Column("MaID")]
    [StringLength(50)]
    public string MaId { get; set; } = null!;

    [StringLength(50)]
    public string? MaPhieuDangKy { get; set; }

    [Column("MaPLHC")]
    [StringLength(50)]
    public string? MaPlhc { get; set; }

    [Column("TenPLHC")]
    [StringLength(200)]
    public string? TenPlhc { get; set; }

    [StringLength(200)]
    public string? TenHienThi { get; set; }

    public int? SoLuong { get; set; }

    [StringLength(50)]
    public string? DonViTinh { get; set; }

    [StringLength(200)]
    public string? GhiChu { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? NgayHetHan { get; set; }

    [StringLength(200)]
    public string? TenNhaCungCap { get; set; }

    [StringLength(50)]
    public string? SoLo { get; set; }

    public bool? IsDel { get; set; }

    [ForeignKey("MaPlhc")]
    [InverseProperty("PhieuDangKyPhuLieuHoaChats")]
    public virtual DmPhuLieuHoaChat? MaPlhcNavigation { get; set; }
}
