using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhuongPhapRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "TenPp không được bỏ trống")]
        [StringLength(200, ErrorMessage = "TenPp tối đa 200 ký tự")]
        public string? TenPp { get; set; }
        [StringLength(1000, ErrorMessage = "GhiChu tối đa 1000 ký tự")]

        [Required(ErrorMessage = "NoiDung không được bỏ trống")]
        public string? NoiDung { get; set; }

        public string? GhiChu { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Đơn giá phải lớn hơn 0")]
        [Required(ErrorMessage = "DonGia không được bỏ trống")]
        public decimal? DonGia { get; set; }
    }
}
