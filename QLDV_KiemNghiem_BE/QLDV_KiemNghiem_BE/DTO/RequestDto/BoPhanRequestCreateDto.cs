using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class BoPhanRequestCreateDto
    {
        [Required(ErrorMessage = "TenBoPhan is required")]
        [MaxLength(200, ErrorMessage = "TenBoPhan qua dai")]
        public string? TenBoPhan { get; set; }
    }
}
