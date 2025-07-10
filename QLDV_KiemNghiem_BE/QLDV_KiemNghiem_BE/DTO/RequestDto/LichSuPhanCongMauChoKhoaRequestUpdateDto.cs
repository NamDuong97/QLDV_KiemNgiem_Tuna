using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class LichSuPhanCongMauChoKhoaRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId is required")]
        [MaxLength(50, ErrorMessage = "MaId qua dai")]
        public string? MaId { get; set; }

        [MaxLength(500, ErrorMessage = "GhiChu qua dai")]
        public string? GhiChu { get; set; }
    }
}
