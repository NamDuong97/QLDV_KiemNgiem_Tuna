﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuDeXuatPhongBanDto
    {
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

        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        public List<ChiTietPhieuDeXuatPhongBanDto> ChiTietPhieuDeXuatPhongBans { get; set; } = new List<ChiTietPhieuDeXuatPhongBanDto>();
    }
}
