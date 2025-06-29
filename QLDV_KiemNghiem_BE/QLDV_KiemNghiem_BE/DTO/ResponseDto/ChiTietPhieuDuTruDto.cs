using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class ChiTietPhieuDuTruDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhieuDuTru { get; set; }

        [StringLength(50)]
        public string? DonViTinh { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? SoLuong { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        [StringLength(100)]
        public string? TrangThai { get; set; }

        [Column("MaDM_PLHC")]
        [StringLength(50)]
        public string? MaDmPlhc { get; set; }
    }
}
