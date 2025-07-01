using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuTienDoLamViecRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        [StringLength(50, ErrorMessage = "MaId tối đa 50 ký tự")]
        public string MaId { get; set; } = null!;

        [StringLength(500, ErrorMessage = "TenGiaiDoanThucHien tối đa 500 ký tự")]
        public string? TenGiaiDoanThucHien { get; set; } = string.Empty;

        public DateTime? ThoiGianTu { get; set; }

        public DateTime? ThoiGianDen { get; set; }

        public string? NoiDungBaoCao { get; set; } = string.Empty;

        public string? NoiDungDanhGia { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "GhiChu tối đa 500 ký tự")]
        public string? GhiChu { get; set; } = string.Empty;

    }
}
