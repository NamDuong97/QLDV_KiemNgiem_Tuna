using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class LichSuPhanCongRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId is required")]
        [MaxLength(50, ErrorMessage = "MaId qua dai")]
        public string MaId { get; set; } = null!;
        [Required(ErrorMessage = "MaPhanCongNoiBo is required")]
        [MaxLength(50, ErrorMessage = "MaPhanCongNoiBo qua dai")]
        public string MaPhanCongNoiBo { get; set; } = null!;

        public string ManvCu { get; set; } = string.Empty;

        [MaxLength(50, ErrorMessage = "ManvMoi qua dai")]
        public string? ManvMoi { get; set; } = null;

        [Required(ErrorMessage = "LamTu is required")]
        public DateTime LamTu { get; set; }

        public DateTime? LamToi { get; set; }

        public string? ManvPhanCong { get; set; } = string.Empty;

        public string? TennvPhanCong { get; set; } = string.Empty;

        public DateTime? ThoiGianPhanCongLai { get; set; }

        public string? LyDoPhanCongLai { get; set; } = string.Empty;
    }
}
