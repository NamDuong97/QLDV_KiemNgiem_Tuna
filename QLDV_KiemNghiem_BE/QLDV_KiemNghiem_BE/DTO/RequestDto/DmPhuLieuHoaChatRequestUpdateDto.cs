using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class DmPhuLieuHoaChatRequestUpdateDto
    {
        [Required(ErrorMessage = "MaID is required")]
        public string MaId { get; set; } = null!;

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
