using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class LichSuPhanCongRequestCreateDto
    {
        [Required(ErrorMessage = "MaPhanCongNoiBo is required")]
        [MaxLength(50, ErrorMessage = "MaPhanCongNoiBo qua dai")]
        public string MaPhanCongNoiBo { get; set; } = null!;

        [Required(ErrorMessage = "ManvCu is required")]
        [MaxLength(50, ErrorMessage = "ManvCu qua dai")]
        public string ManvCu { get; set; } = null!;

        [MaxLength(50, ErrorMessage = "ManvMoi qua dai")]
        public string? ManvMoi { get; set; } = null;

        [Required(ErrorMessage = "LamTu is required")]
        public DateTime LamTu { get; set; }

        public DateTime? LamToi { get; set; }

        [Required(ErrorMessage = "ManvPhanCong is required")]
        [MaxLength(50, ErrorMessage = "ManvPhanCong qua dai")]
        public string? ManvPhanCong { get; set; }

        [Required(ErrorMessage = "TennvPhanCong is required")]
        [MaxLength(200, ErrorMessage = "TennvPhanCong qua dai")]
        public string? TennvPhanCong { get; set; }

        public DateTime? ThoiGianPhanCongLai { get; set; }

        public string? LyDoPhanCongLai { get; set; } = string.Empty;
    }
}
