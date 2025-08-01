﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuDangKyMauHinhAnhDto
    {
        public string? MaId { get; set; }

        public string? MaMau { get; set; }

        public string? Ten { get; set; }

        public string? DinhDang { get; set; }
        public string? GhiChu { get; set; }

        public string? LoaiAnh { get; set; }

        public bool? TrangThai { get; set; }

        public IFormFile? Image { get; set; }

        public string? PathImg { get; set; }

        public bool IsDel { get; set; }
    }
}
