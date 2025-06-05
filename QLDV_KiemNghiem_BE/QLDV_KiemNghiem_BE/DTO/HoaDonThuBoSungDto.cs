using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class HoaDonThuBoSungDto
    {
        public string MaId { get; set; } = null!;
        public string? MaHd { get; set; }
        public decimal? TongTien { get; set; }
        public DateTime? NgayLap { get; set; }
        public string? ManvLap { get; set; } 
        public string? TrangThai { get; set; }
        public DateTime? NgayTao { get; set; }
        public string? NguoiTao { get; set; }
        public string? NguoiSua { get; set; }
        public DateTime? NgaySua { get; set; }
        public ICollection<ChiTietHoaDonThuBoSungDto> ChiTietHoaDonThuBoSungs { get; set; } = new List<ChiTietHoaDonThuBoSungDto>();
    }
}
