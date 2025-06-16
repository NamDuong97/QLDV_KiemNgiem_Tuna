using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class BoPhanRequestUpdateDto
    {
        [Required(ErrorMessage = "MaID is required")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "TenBoPhan is required")]
        [MaxLength(200, ErrorMessage = "TenBoPhan qua dai")]
        public string TenBoPhan { get; set; } = null!;
    }
}
