using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ReassignPhanCongNoiBoRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId is required")]
        [MaxLength(50, ErrorMessage = "MaId qua dai")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "ManvPhanCong is required")]
        public string ManvPhanCong { get; set; } = null!;

        [Required(ErrorMessage = "TennvPhanCong is required")]
        public string TennvPhanCong { get; set; } = null!;

        [Required(ErrorMessage = "ManvXyLy is required")]
        public string ManvXyLy { get; set; } = null!;

        [Required(ErrorMessage = "TennvXuLy is required")]
        public string TennvXuLy { get; set; } = null!;

        [Required(ErrorMessage = "LamTu is required")]
        public DateTime NvCuLamToi { get; set; }

        [Required(ErrorMessage = "LamTu is required")]
        public DateTime NvMoiLamTu { get; set; }

        [MaxLength(500, ErrorMessage = "GhiChu qua dai")]
        public string? GhiChu { get; set; } = string.Empty;

        [Required(ErrorMessage = "LyDoPhanCongLai is required")]
        [MaxLength(500, ErrorMessage = "LyDoPhanCongLai qua dai")]
        public string LyDoPhanCongLai { get; set; } = null!;

        // Phân công lại cho 1 nhân viên khác
    }
}
