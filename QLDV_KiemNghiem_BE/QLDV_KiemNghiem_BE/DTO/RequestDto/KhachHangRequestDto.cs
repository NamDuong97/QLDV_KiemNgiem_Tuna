using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class KhachHangRequestDto
    {
        public string? MaId { get; set; } = string.Empty;

        [StringLength(200)]
        public string? TenKh { get; set; }

        [StringLength(500)]
        public string? DiaChi { get; set; }

        [StringLength(200)]
        public string? TenNguoiDaiDien { get; set; }

        [StringLength(50)]
        public string? SoDienThoai { get; set; }

    }
}
