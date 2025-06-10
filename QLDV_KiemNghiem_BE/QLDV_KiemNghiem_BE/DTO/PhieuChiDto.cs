using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class PhieuChiDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhieuChi { get; set; }

        public string? LyDoChi { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? SoTien { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayChi { get; set; }

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

        [Column("MaHoaDonMuaPLHC")]
        [StringLength(50)]
        public string? MaHoaDonMuaPlhc { get; set; }

        [StringLength(50)]
        public string? ManvTao { get; set; }
    }
}
