using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class PhieuDangKyMauHinhAnhDto
    {
        public string MaId { get; set; } = null!;

        public string? MaMau { get; set; }

        public string? Ten { get; set; }

        public string? DinhDang { get; set; }
        public string? GhiChu { get; set; }

        public string? LoaiAnh { get; set; }

        public bool? TrangThai { get; set; }

        public string? NguoiTao { get; set; }

        public string? NguoiSua { get; set; }

        public DateTime? NgayTao { get; set; }

        public DateTime? NgaySua { get; set; }
    }
}
