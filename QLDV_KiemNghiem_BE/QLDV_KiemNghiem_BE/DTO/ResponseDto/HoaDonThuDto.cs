using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class HoaDonThuDto
    {
        public string? MaId { get; set; }

        [StringLength(50)]
        public string? MaHd { get; set; }

        [StringLength(50)]
        public string? MaPhieuDangKy { get; set; }

        [StringLength(50)]
        public string? ManvXuLy { get; set; }

        public decimal? TongTien { get; set; }

        public DateTime? NgayLap { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        public bool? TrangThai { get; set; }

        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        public DateTime? NgaySua { get; set; }

        [StringLength(50)]
        public string? SoDkpt { get; set; }
        public ICollection<HoaDonThuBoSungDto> HoaDonThuBoSungs { get; set; } = new List<HoaDonThuBoSungDto>();
        public ICollection<ChiTietHoaDonThuDto> ChiTietHoaDonThus { get; set; } = new List<ChiTietHoaDonThuDto>();
    }
}
