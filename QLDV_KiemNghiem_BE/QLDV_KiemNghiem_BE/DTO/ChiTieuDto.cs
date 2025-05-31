using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class ChiTieuDto
    {
        public string? MaId { get; set; }

        [StringLength(200)]
        public string? MaChiTieu { get; set; }

        [StringLength(50)]
        public string? MaTieuChuan { get; set; }

        [StringLength(200)]
        public string? TenChiTieu { get; set; }

        public string? GhiChu { get; set; }

        public bool? TrangThai { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }
    }
}
