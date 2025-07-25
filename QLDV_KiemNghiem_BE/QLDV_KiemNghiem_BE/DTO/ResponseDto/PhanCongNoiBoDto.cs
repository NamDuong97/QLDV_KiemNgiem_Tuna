﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhanCongNoiBoDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhanCongNoiBo { get; set; }

        [StringLength(50)]
        public string? ManvXyLy { get; set; }

        [Column("MaPDK_Mau")]
        [StringLength(50)]
        public string? MaPdkMau { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LamTu { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LamToi { get; set; }

        [StringLength(50)]
        public string? ManvPhanCong { get; set; }

        [StringLength(200)]
        public string? TennvPhanCong { get; set; }

        public bool? TrangThai { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [StringLength(200)]
        public string? TennvXuly { get; set; }

        [StringLength(200)]
        public string? TenMau { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTraKetQua { get; set; }

        public  ICollection<LichSuPhanCongDto> LichSuPhanCongs { get; set; } = new List<LichSuPhanCongDto>();
    }
}
