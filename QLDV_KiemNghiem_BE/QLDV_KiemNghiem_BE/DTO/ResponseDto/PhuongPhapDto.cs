using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhuongPhapDto
    {
        public string MaId { get; set; } = null!;

        [Column("MaPP")]
        [StringLength(50)]
        public string? MaPp { get; set; }

        [Column("TenPP")]
        [StringLength(200)]
        public string? TenPp { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? DonGia { get; set; }

        [StringLength(50)]
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
