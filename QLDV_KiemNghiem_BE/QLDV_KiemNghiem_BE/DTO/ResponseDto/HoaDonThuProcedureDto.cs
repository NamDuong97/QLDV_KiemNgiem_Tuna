using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Models;
using System.Runtime.InteropServices;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class HoaDonThuProcedureDto
    {
        public string MaID { get; set; } = string.Empty;
        public string SoDKPT { get; set; } = string.Empty;
        public string MaHD { get; set; } = string.Empty;
        public string MaPhieuDangKy { get; set; } = string.Empty;

        public string ManvXuLy { get; set; } = string.Empty;
        public string TenNvXuLy { get; set; } = string.Empty;

        public string MaKH { get; set; } = string.Empty;
        public string TenKH { get; set; } = string.Empty;
        public string SoDT { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string DiaChi { get; set; } = string.Empty;

        public decimal? TongTien { get; set; } = 0;
        public DateTime? NgayLap { get; set; }

        public string GhiChu { get; set; } = string.Empty;
        public string TrangThai { get; set; } = string.Empty;
        public bool? Active { get; set; }

        public string NguoiTao { get; set; } = string.Empty;
        public string NguoiSua { get; set; } = string.Empty;
        public DateTime? NgaySua { get; set; }

        // Danh sách con
        public List<HoaDonThuBoSungProcedureDto> DsHoaDonThuBoSung { get; set; } = new();
        public List<ChiTietHoaDonThuDto> DsChiTietHoaDonThu { get; set; } = new();
    }
}
