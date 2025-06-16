using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class LoaiMauRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "TenLoaiMau không được bỏ trống")]
        [StringLength(200, ErrorMessage = "TenLoaiMau tối đa 200 ký tự")]
        public string? TenLoaiMau { get; set; }

        public string? MoTa { get; set; }
    }
}
