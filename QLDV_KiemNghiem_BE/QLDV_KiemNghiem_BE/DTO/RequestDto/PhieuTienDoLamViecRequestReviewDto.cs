using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuTienDoLamViecRequestReviewDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        [StringLength(50, ErrorMessage = "MaId tối đa 50 ký tự")]
        public string MaId { get; set; } = null!;

        [StringLength(500, ErrorMessage = "Message tối đa 500 ký tự")]
        public string? Message { get; set; } = string.Empty;
    }
}
