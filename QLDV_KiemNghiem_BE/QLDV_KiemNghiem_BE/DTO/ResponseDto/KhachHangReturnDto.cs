﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class KhachHangReturnDto
    {
        public string? MaId { get; set; } = string.Empty;
        public string? MaKh { get; set; }

        [Column("TenKH")]
        [StringLength(200)]
        public string? TenKh { get; set; }

        [StringLength(500)]
        public string? DiaChi { get; set; }

        [StringLength(200)]
        public string? TenNguoiDaiDien { get; set; }

        [StringLength(50)]
        public string? SoDienThoai { get; set; }

        [StringLength(50)]
        public string? Email { get; set; }

        public int? ThanThien { get; set; }

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
//Trả về cho nhân viên trong viện