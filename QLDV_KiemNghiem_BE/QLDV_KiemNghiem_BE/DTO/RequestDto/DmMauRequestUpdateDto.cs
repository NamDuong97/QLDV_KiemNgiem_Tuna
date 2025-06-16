using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class DmMauRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "TenMau không được bỏ trống")]
        [StringLength(200, ErrorMessage = "TenMau tối đa 200 ký tự")]
        public string? TenMau { get; set; }

        [Required(ErrorMessage = "MaLoaiMau không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaLoaiMau tối đa 200 ký tự")]
        public string? MaLoaiMau { get; set; }

        public string? GhiChu { get; set; }
    }
}
