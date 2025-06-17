using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChiTietPhieuDeXuatPhongBanRequestUpdateDto
    {
        public string? MaId { get; set; } 

        [Required(ErrorMessage = "Mã phiếu đề xuất là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Mã phiếu đề xuất không được vượt quá 50 ký tự.")]
        public string? MaPhieuDeXuat { get; set; } 

        [Required(ErrorMessage = "Mã phiếu đăng ký mẫu là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Mã phiếu đăng ký mẫu không được vượt quá 50 ký tự.")]
        public string? MaPdkMau { get; set; } 

        [StringLength(50, ErrorMessage = "Ghi chú không được vượt quá 50 ký tự.")]
        public string? GhiChu { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày từ chối phải là ngày giờ hợp lệ.")]
        [Column(TypeName = "datetime")]
        public DateTime? NgayTuChoi { get; set; } 

        [StringLength(500, ErrorMessage = "Lý do từ chối không được vượt quá 500 ký tự.")]
        public string? LyDoTuChoi { get; set; }

        [StringLength(50, ErrorMessage = "Mã nhân viên từ chối không được vượt quá 50 ký tự.")]
        public string? ManvTuChoi { get; set; } 

        [DataType(DataType.DateTime, ErrorMessage = "Ngày thực hiện kiểm nghiệm phải là ngày giờ hợp lệ.")]
        public DateTime? NgayThucHienKiemNghiem { get; set; }
        public int TrangThai { get; set; } 
        // Trang thai = 0 la xoa, 1 la sua
    }
}
