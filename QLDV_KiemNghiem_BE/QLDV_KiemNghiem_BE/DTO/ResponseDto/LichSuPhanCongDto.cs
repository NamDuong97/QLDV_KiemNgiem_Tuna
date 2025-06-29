using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class LichSuPhanCongDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhanCongNoiBo { get; set; }

        [StringLength(50)]
        public string? ManvCu { get; set; }

        [StringLength(50)]
        public string? ManvMoi { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LamTu { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LamToi { get; set; }

        [StringLength(50)]
        public string? ManvPhanCong { get; set; }

        [StringLength(200)]
        public string? TennvPhanCong { get; set; }

        [StringLength(100)]
        public string? TrangThai { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [StringLength(500)]
        public string? LyDoPhanCongLai { get; set; }
    }
}
