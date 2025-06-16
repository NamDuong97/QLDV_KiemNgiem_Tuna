using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class DmPhuLieuHoaChatRequestCreateDto
    {
        [Required(ErrorMessage = "TenDmPlhc is required")]
        [MaxLength(200, ErrorMessage = "TenBoPhan qua dai")]
        public string TenDmPlhc { get; set; } = null!;

        [Required(ErrorMessage = "NongDo is required")]
        [MaxLength(200, ErrorMessage = "DieuKienBaoQuan qua dai")]
        public string? TenHienThi { get; set; }

        [Required(ErrorMessage = "NongDo is required")]
        public decimal? NongDo { get; set; }

        [Required(ErrorMessage = "NongDo is required")]
        [MaxLength(50, ErrorMessage = "DonViNongDo qua dai")]
        public string? DonViNongDo { get; set; }

        [MaxLength(200, ErrorMessage = "DieuKienBaoQuan qua dai")]
        public string? DieuKienBaoQuan { get; set; }
    }
}
