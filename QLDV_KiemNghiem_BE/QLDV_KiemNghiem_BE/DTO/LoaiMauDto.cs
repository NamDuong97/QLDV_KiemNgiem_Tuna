using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class LoaiMauDto
    {
        public string? MaId { get; set; }

        [StringLength(50)]
        public string? MaLoaiMau { get; set; }

        [StringLength(200)]
        public string? TenLoaiMau { get; set; }

        [StringLength(500)]
        public string? Mota { get; set; }
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
