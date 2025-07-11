using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class LichSuPhanCongMauChoKhoaRequestCreateDto
    {
        [Required(ErrorMessage = "MaMau is required")]
        [MaxLength(50, ErrorMessage = "MaMau qua dai")]
        public string? MaMau { get; set; }

        [Required(ErrorMessage = "MaKhoa is required")]
        [MaxLength(50, ErrorMessage = "MaKhoa qua dai")]
        public string? MaKhoa { get; set; }

        [Required(ErrorMessage = "ManvPhanCong is required")]
        [MaxLength(50, ErrorMessage = "ManvPhanCong qua dai")]
        public string? ManvPhanCong { get; set; }

        [Required(ErrorMessage = "ThoiGianPhanCong is required")]
        public DateTime? ThoiGianPhanCong { get; set; }

        [MaxLength(500, ErrorMessage = "GhiChu qua dai")]
        public string? GhiChu { get; set; }
    }

}
