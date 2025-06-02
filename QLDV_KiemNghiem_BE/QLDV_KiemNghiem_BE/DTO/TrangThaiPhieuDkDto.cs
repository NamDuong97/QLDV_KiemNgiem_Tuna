using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class TrangThaiPhieuDkDto
    {
        public string MaId { get; set; } = null!;

        [Column("MaTT")]
        [StringLength(50)]
        public string? MaTt { get; set; }

        [Column("TenTT")]
        [StringLength(200)]
        public string? TenTt { get; set; }

        public bool? TrangThai { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [StringLength(500)]
        public string? Ghichu { get; set; }

    }
}
