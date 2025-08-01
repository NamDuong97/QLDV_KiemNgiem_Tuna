﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class ChiTietHoaDonThuDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaMau { get; set; }

        [Column("MaHD")]
        [StringLength(50)]
        public string? MaHd { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? ThanhTien { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        public bool? TrangThai { get; set; }

    }
}
