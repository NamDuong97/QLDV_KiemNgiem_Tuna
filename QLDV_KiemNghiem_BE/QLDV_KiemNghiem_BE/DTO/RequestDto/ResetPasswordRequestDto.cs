using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ResetPasswordRequestDto
    {
        [Required(ErrorMessage = "MaID is required")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        [MaxLength(200, ErrorMessage = "Password qua dai")]
        public string Password { get; set; } = null!;
    }
}
