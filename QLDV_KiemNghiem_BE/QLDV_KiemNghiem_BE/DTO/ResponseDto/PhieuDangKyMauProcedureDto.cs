﻿using QLDV_KiemNghiem_BE.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuDangKyMauProcedureDto
    {
        [Column("MaID")]
        [StringLength(50)]
        public string MaId { get; set; } = null!;

        [Column("MaDm_Mau")]
        [StringLength(50)]
        public string? MaDmMau { get; set; }

        [StringLength(200)]
        public string? TenMau { get; set; }

        [StringLength(50)]
        public string? MaLoaiMau { get; set; }

        [StringLength(200)]
        public string? TenLoaiMau { get; set; }

        [StringLength(50)]
        public string? MaTieuChuan { get; set; }

        [StringLength(200)]
        public string? TenTieuChuan { get; set; }

        [StringLength(50)]
        public string? MaPhieuDangKy { get; set; }

        [StringLength(50)]
        public string? ManvThucHien { get; set; }

        [StringLength(200)]
        public string? TennvThucHien { get; set; }

        [StringLength(50)]
        public string? MaKhoa { get; set; }

        [StringLength(200)]
        public string? TenKhoa { get; set; }

        [StringLength(50)]
        public string? SoLo { get; set; }

        [StringLength(200)]
        public string? DonViSanXuat { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySanXuat { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? HanSuDung { get; set; }

        [StringLength(50)]
        public string? DonViTinh { get; set; }

        [Column(TypeName = "decimal(18, 0)")]
        public decimal? SoLuong { get; set; }

        public string? YeuCauKiemNghiem { get; set; }

        [StringLength(500)]
        public string? TinhTrangMau { get; set; }

        [StringLength(200)]
        public string? DieuKienBaoQuan { get; set; }

        public bool? LuuMau { get; set; }

        public bool? XuatKetQua { get; set; }

        [StringLength(50)]
        public string? TrangThaiNhanMau { get; set; }

        [StringLength(50)]
        public string? GhiChu { get; set; }

        public int? ThoiGianTieuChuan { get; set; }

        [Column("MaPDK_Mau")]
        [StringLength(50)]
        public string? MaPdkMau { get; set; }

        [Column("LoaiDV")]
        [StringLength(50)]
        public string? LoaiDv { get; set; }

        [Column("MaLoaiDV")]
        [StringLength(50)]
        public string? MaLoaiDv { get; set; }

        public bool? IsDel { get; set; }

        public int? TrangThaiPhanCong { get; set; }

        public DateTime? NgayTraKetQua { get; set; }    
        public virtual ICollection<PhieuDangKyMauHinhAnhDto> PhieuDangKyMauHinhAnhs { get; set; } = new List<PhieuDangKyMauHinhAnhDto>();

    }
}

