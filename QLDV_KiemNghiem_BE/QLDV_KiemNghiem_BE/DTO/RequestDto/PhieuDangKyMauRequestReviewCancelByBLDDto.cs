using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuDangKyMauRequestReviewCancelByBLDDto
    {
        [Required(ErrorMessage = "MaMau không được bỏ trống!")]
        [StringLength(50, ErrorMessage = "MaMau tối đa 50 ký tự")]
        public string MaMau { get; set; } = null!;

        [Required(ErrorMessage = "Message không được bỏ trống!")]
        [StringLength(500, ErrorMessage = "Message tối đa 500 ký tự")]
        public string? Message { get; set; } = string.Empty;

        public string? MaKhoa { get; set; } = string.Empty;

        [Required(ErrorMessage = "Action không được bỏ trống!")]
        public bool Action {  get; set; } = false;
    }
}
