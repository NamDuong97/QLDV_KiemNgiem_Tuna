using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class CancelChiTietPhieuDeXuatPhongBanRequestDto
    {
        [Required(ErrorMessage = "MaMau is required")]
        [MaxLength(50, ErrorMessage = "MaMau qua dai")]
        public string MaMau { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;
        // Cần mã mẫu để vào bảng ChiTietPhieuDeXuatPhongBan thay đổi trạng thái thành Bị hủy do không có phòng ban nào tiếp nhận
    }
}
