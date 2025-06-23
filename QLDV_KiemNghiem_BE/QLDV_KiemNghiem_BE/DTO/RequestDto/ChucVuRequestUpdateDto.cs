using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChucVuRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId is required")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "TenChucVu không được bỏ trống")]
        [StringLength(200, ErrorMessage = "TenChucVu tối đa 200 ký tự")]
        public string TenChucVu { get; set; } = null!;

    }
}
