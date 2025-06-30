using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuDuTruRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        public string MaId { get; set; } = null!;

        [StringLength(500)]
        public string? NoiDungDuyet { get; set; } = string.Empty;
        public string? GhiChu { get; set; } = string.Empty;
        public List<ChiTietPhieuDuTruRequestUpdateDto> ChiTietPhieuDuTrus { get; set; } = new List<ChiTietPhieuDuTruRequestUpdateDto>();
    }
}
