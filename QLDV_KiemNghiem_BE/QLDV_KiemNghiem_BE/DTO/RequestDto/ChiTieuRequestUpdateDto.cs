using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChiTieuRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "TenChiTieu không được bỏ trống")]
        [StringLength(200, ErrorMessage = "TenChiTieu tối đa 200 ký tự")]
        public string? TenChiTieu { get; set; }
        [StringLength(1000, ErrorMessage = "GhiChu tối đa 1000 ký tự")]
        public string? GhiChu { get; set; }
    }
}
