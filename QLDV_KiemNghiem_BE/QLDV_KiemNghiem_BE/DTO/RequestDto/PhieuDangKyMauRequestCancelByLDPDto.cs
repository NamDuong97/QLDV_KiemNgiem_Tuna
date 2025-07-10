using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuDangKyMauRequestCancelByLDPDto
    {
        [Required(ErrorMessage = "MaMau is required")]
        [MaxLength(50, ErrorMessage = "MaMau qua dai")]
        public string MaMau { get; set; } = null!;

        [Required(ErrorMessage = "Message is required")]
        [MaxLength(500, ErrorMessage = "Message qua dai")]
        public string Message { get; set; } = null!;
    }
}
