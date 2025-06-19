using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class ChiTietPhieuDeXuatPhongBanDto
    {
        public string? MaId { get; set; }

        [StringLength(50)]
        public string? MaPhieuDeXuat { get; set; }

        [Column("MaPDK_Mau")]
        [StringLength(50)]
        public string? MaPdkMau { get; set; }

        [StringLength(50)]
        public string? GhiChu { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTuChoi { get; set; }

        [StringLength(500)]
        public string? LyDoTuChoi { get; set; }

        [StringLength(50)]
        public string? ManvTuChoi { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayThucHienKiemNghiem { get; set; }

        public int? TrangThai { get; set; }

    }
}
