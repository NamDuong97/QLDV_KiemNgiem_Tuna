using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuLuuMauDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhieuLuu { get; set; }

        [Column("MaPDK_Mau")]
        [StringLength(50)]
        public string? MaPdkMau { get; set; }

        [StringLength(50)]
        public string? DonViTinh { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? SoLuong { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? ThoiGianLuu { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? LuuDenNgay { get; set; }

        [StringLength(50)]
        public string? ManvLuu { get; set; }

        [StringLength(100)]
        public string? TrangThai { get; set; }
    }
}
