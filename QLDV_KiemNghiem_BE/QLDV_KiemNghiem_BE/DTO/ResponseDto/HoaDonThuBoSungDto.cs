using QLDV_KiemNghiem_BE.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class HoaDonThuBoSungDto
    {
        public string MaId { get; set; } = null!;

        [Column("MaHD")]
        [StringLength(50)]
        public string? MaHd { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TongTien { get; set; }

        [StringLength(50)]
        public string? ManvLap { get; set; }

        [StringLength(50)]
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
        public string? GhiChu { get; set; }

        public bool? Active { get; set; }
        public ICollection<ChiTietHoaDonThuBoSungDto> ChiTietHoaDonThuBoSungs { get; set; } = new List<ChiTietHoaDonThuBoSungDto>();
    }
}
