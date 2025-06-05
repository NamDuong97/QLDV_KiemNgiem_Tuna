using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class ChiTietHoaDonThuBoSungDto
    {
        public string MaId { get; set; } = null!;

        [Column("MaHDBS")]
        [StringLength(50)]
        public string? MaHdbs { get; set; }

        [StringLength(50)]
        public string? DonViTinh { get; set; }

        public int? SoLuong { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? DonGia { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? ThanhTien { get; set; }

        public bool? TrangThai { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [Column("MaDM_PLHC")]
        [StringLength(50)]
        public string? MaDmPlhc { get; set; }
    }
}
