using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuDangKyMauRequestCancelByKHTHDto
    {
        [Required(ErrorMessage = "MaId is required")]
        [MaxLength(50, ErrorMessage = "MaId qua dai")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "Message is required")]
        [MaxLength(500, ErrorMessage = "Message qua dai")]
        public string Message { get; set; } = null!;

        [Required(ErrorMessage = "TypeCancel is required")]
        [Range(3,4,ErrorMessage = "TypeCancel is between 3 and 4")]
        public int TypeCancel { get; set; } = 0;

        // 3 la bi huy boi khoa chuyen mon, 4 bi huy boi khach hang 
        // Test
    }
}
