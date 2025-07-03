using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChiTietHoaDonThuRequestCreateDto
    {
        [Required(ErrorMessage = "MaMau không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaMau tối đa 50 ký tự")]
        public string MaMau { get; set; } = null!;

        [Required(ErrorMessage = "ThanhTien không được bỏ trống")]
        [Range(0, double.MaxValue, ErrorMessage = "ThanhTien phải lớn hơn 0")]
        public decimal ThanhTien { get; set; }

        [StringLength(500, ErrorMessage = "MaMau tối đa 500 ký tự")]
        public string? GhiChu { get; set; }
    }

}
