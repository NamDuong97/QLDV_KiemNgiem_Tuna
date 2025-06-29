using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuDuTruRequestCreateDto
    {
        [Required(ErrorMessage = "MaPdkMau không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaPdkMau tối đa 50 ký tự")]
        public string MaPdkMau { get; set; } = null!;

        [Required(ErrorMessage = "ManvLapPhieu không được bỏ trống")]
        [StringLength(50, ErrorMessage = "ManvLapPhieu tối đa 50 ký tự")]
        public string ManvLapPhieu { get; set; } = null!;

        [Required(ErrorMessage = "MaKhoa không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaKhoa tối đa 50 ký tự")]
        public string? MaKhoa { get; set; }
        public string? GhiChu { get; set; } = string.Empty;
        public List<ChiTietPhieuDuTruRequestCreateDto> ChiTietPhieuDuTrus { get; set; } = new List<ChiTietPhieuDuTruRequestCreateDto>();
    }
}
