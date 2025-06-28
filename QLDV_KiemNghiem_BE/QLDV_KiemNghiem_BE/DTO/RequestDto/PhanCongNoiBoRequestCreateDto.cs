using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhanCongNoiBoRequestCreateDto
    {
        [Required(ErrorMessage = "MaPdkMau is required")]
        [MaxLength(50, ErrorMessage = "MaPdkMau qua dai")]
        public string MaPdkMau { get; set; } = null!;

        [Required(ErrorMessage = "TenMau is required")]
        [MaxLength(200, ErrorMessage = "TenMau qua dai")]
        public string TenMau { get; set; } = null!;

        [Required(ErrorMessage = "LamTu is required")]
        public DateTime LamTu { get; set; }

        [Required(ErrorMessage = "ManvPhanCong is required")]
        [MaxLength(50, ErrorMessage = "ManvPhanCong qua dai")]
        public string? ManvPhanCong { get; set; }

        [Required(ErrorMessage = "TennvPhanCong is required")]
        [MaxLength(200, ErrorMessage = "TennvPhanCong qua dai")]
        public string? TennvPhanCong { get; set; }

        [Required(ErrorMessage = "ManvXyLy is required")]
        [MaxLength(50, ErrorMessage = "ManvXyLy qua dai")]
        public string? ManvXyLy { get; set; }

        [Required(ErrorMessage = "TennvXuLy is required")]
        [MaxLength(200, ErrorMessage = "TennvXuLy qua dai")]
        public string? TennvXuLy { get; set; }

        [Required(ErrorMessage = "NgayTraKetQua is required")]
        public DateTime NgayTraKetQua { get; set; }

        [MaxLength(500, ErrorMessage = "GhiChu qua dai")]
        public string? GhiChu { get; set; }
    }
}
