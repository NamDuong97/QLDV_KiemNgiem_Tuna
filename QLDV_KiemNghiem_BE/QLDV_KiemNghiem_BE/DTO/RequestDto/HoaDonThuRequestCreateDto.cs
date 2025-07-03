using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class HoaDonThuRequestCreateDto
    {
        [Required(ErrorMessage = "MaPhieuDangKy không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaPhieuDangKy tối đa 50 ký tự")]
        public string MaPhieuDangKy { get; set; } = null!;

        [Required(ErrorMessage = "v không được bỏ trống")]
        [StringLength(50, ErrorMessage = "SoDKPT tối đa 50 ký tự")]
        public string SoDKPT { get; set; } = null!;

        [Range(0, double.MaxValue, ErrorMessage = "TongTien phải lớn hơn 0")]
        public decimal TongTien { get; set; } = 0;

        [StringLength(500, ErrorMessage = "GhiChu tối đa 50 ký tự")]
        public string? GhiChu { get; set; }

        public List<ChiTietHoaDonThuRequestCreateDto> ChiTietHoaDonThuDtos { get; set; } = new List<ChiTietHoaDonThuRequestCreateDto>();
    }
}

// NgayTraKetQua, luumau, yeucaukiemnghiem lay tu pdkm