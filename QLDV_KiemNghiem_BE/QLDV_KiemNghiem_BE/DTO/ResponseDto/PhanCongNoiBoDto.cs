using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhanCongNoiBoDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhanCongNoiBo { get; set; }

        [StringLength(50)]
        public string? ManvXyLy { get; set; }

        [Column("MaPDK_Mau")]
        [StringLength(50)]
        public string? MaPdkMau { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LamTu { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LamToi { get; set; }

        [StringLength(50)]
        public string? ManvPhanCong { get; set; }

        [StringLength(200)]
        public string? TennvPhanCong { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? ThoiGianPhanCong { get; set; }

        [StringLength(100)]
        public string? TrangThai { get; set; }
    }
}
