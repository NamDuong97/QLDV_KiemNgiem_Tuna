using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhanCongNoiBoRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId is required")]
        [MaxLength(50, ErrorMessage = "MaId qua dai")]
        public string MaId { get; set; } = null!;
        public DateTime? LamTu { get; set; } = null;
        public DateTime? NgayTraKetQua { get; set; } = null;

        [MaxLength(500, ErrorMessage = "GhiChu qua dai")]
        public string? GhiChu { get; set; }

        // Cập nhật lại các thông tin cơ bản thôi, còn nếu ngay từ đầu chọn sai nhân viên xử lý thì thao tác phân công lại
    }
}
