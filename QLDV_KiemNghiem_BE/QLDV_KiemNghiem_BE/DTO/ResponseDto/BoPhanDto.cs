﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class BoPhanDto
    {
        public string? MaId { get; set; }

        [StringLength(50)]
        public string? MaBoPhan { get; set; }

        [StringLength(200)]
        public string? TenBoPhan { get; set; }

        public bool? TrangThai { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }
    }
}
