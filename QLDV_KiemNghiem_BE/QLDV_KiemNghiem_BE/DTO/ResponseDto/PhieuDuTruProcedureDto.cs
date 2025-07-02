using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Models;
using System.Runtime.InteropServices;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuDuTruProcedureDto
    {
        public string? MaID { get; set; }
        public string? MaPhieuDuTru { get; set; }
        public string? MaPDK_Mau { get; set; }
        public string? TenMau { get; set; }
        public string? MaKhoa { get; set; }
        public string? TenKhoa { get; set; }
        public string? ManvLapPhieu { get; set; }
        public string? TenNvLap { get; set; }
        public DateTime? NgayLap { get; set; }
        public int? TrangThai { get; set; }
        public string? GhiChu { get; set; }
        public bool? Active { get; set; }
        public string? ManvDuyet { get; set; }
        public string? TenNvDuyet { get; set; }
        public string? NoiDungDuyet { get; set; }
        public DateTime? NgaySua { get; set; }
        public string? NguoiSua { get; set; }
        public List<ChiTietPhieuDuTruDto> ChiTietPhieuDuTruDtos { get; set; } = new List<ChiTietPhieuDuTruDto>();
    }
}
