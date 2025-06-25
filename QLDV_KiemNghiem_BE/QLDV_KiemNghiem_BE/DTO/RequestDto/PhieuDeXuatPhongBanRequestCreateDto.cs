using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuDeXuatPhongBanRequestCreateDto
    {
        [Required(ErrorMessage = "Mã khoa tiếp nhận là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Mã khoa tiếp nhận không được vượt quá 50 ký tự.")]
        public string MaKhoaTiepNhan { get; set; } = null!;

        [Required(ErrorMessage = "Mã nhân viên đề xuất là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Mã nhân viên đề xuất không được vượt quá 50 ký tự.")]
        public string? ManvDeXuat { get; set; }

        [Required(ErrorMessage = "Thời gian giao mẫu là bắt buộc.")]
        [DataType(DataType.DateTime, ErrorMessage = "Thời gian giao mẫu phải là ngày giờ hợp lệ.")]
        public DateTime? ThoiGianGiaoMau { get; set; }

        [Required(ErrorMessage = "Chi tiết phiếu đề xuất phòng ban là bắt buộc.")]
        public List<ChiTietPhieuDeXuatPhongBanRequestCreateDto> ChiTietPhieuDeXuatPhongBans { get; set; } = new List<ChiTietPhieuDeXuatPhongBanRequestCreateDto>();
    }
}
