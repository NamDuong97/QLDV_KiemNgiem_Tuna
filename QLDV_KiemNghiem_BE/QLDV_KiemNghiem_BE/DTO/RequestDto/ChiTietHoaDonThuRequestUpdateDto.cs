using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChiTietHoaDonThuRequestUpdateDto
    {
       
        [StringLength(50, ErrorMessage = "MaID tối đa 50 ký tự")]
        public string? MaID { get; set; } = string.Empty;

        [Range(0, double.MaxValue, ErrorMessage = "ThanhTien phải lớn hơn 0")]
        public decimal? ThanhTien { get; set; } = 0;

        [StringLength(500, ErrorMessage = "MaMau tối đa 500 ký tự")]
        public string? GhiChu { get; set; }
        public bool IsDel {  get; set; }   = false;
    }
}
