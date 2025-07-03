using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class HoaDonThuRequestUpdateDto
    {
        [Required(ErrorMessage = "MaID không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaID tối đa 50 ký tự")]
        public string MaID { get; set; } = null!;

        [Range(0, double.MaxValue, ErrorMessage = "TongTien phải lớn hơn 0")]
        public decimal? TongTien { get; set; }

        [StringLength(500, ErrorMessage = "GhiChu tối đa 50 ký tự")]
        public string? GhiChu { get; set; }

        public List<ChiTietHoaDonThuRequestUpdateDto> ChiTietHoaDonThuDtos { get; set; } = new List<ChiTietHoaDonThuRequestUpdateDto>();

    }

}
