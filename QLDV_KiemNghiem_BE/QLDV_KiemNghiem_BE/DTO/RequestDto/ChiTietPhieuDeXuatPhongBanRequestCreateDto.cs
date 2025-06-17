using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChiTietPhieuDeXuatPhongBanRequestCreateDto
    {
       
        [StringLength(50, ErrorMessage = "Mã phiếu đề xuất không được vượt quá 50 ký tự.")]
        public string MaPhieuDeXuat { get; set; } = null!;

        [Required(ErrorMessage = "Mã phiếu đăng ký mẫu là bắt buộc.")]
        [StringLength(50, ErrorMessage = "Mã phiếu đăng ký mẫu không được vượt quá 50 ký tự.")]
        public string MaPdkMau { get; set; } = null!;

        [StringLength(50, ErrorMessage = "Ghi chú không được vượt quá 50 ký tự.")]
        public string? GhiChu { get; set; } 

        [Required(ErrorMessage = "Ngày thực hiện kiểm nghiệm là bắt buộc.")]
        [DataType(DataType.DateTime, ErrorMessage = "Ngày thực hiện kiểm nghiệm phải là ngày giờ hợp lệ.")]
        public DateTime? NgayThucHienKiemNghiem { get; set; } = null!;
        public int TrangThai { get; set; }
    }
}
