using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuDeXuatPhongBanRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        public string MaId { get; set; } = null!;

        [StringLength(50, ErrorMessage = "Mã phiếu đăng ký không được vượt quá 50 ký tự.")]
        public string? MaPhieuDeXuat { get; set; } 

        [StringLength(50, ErrorMessage = "Mã phiếu đăng ký không được vượt quá 50 ký tự.")]
        public string? MaPhieuDangKy { get; set; } 

        [StringLength(100, ErrorMessage = "Tên khách hàng không được vượt quá 100 ký tự.")]
        public string? TenKhachHang { get; set; } 

        [StringLength(50, ErrorMessage = "Mã khoa tiếp nhận không được vượt quá 50 ký tự.")]
        public string? MaKhoaTiepNhan { get; set; }

        [StringLength(50, ErrorMessage = "Mã nhân viên đề xuất không được vượt quá 50 ký tự.")]
        public string? ManvDeXuat { get; set; } 

        [StringLength(50, ErrorMessage = "Mã nhân viên tiếp nhận không được vượt quá 50 ký tự.")]
        public string? ManvTiepNhan { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Thời gian giao mẫu phải là ngày giờ hợp lệ.")]
        public DateTime? ThoiGianGiaoMau { get; set; }  

        [StringLength(100, ErrorMessage = "Trạng thái không được vượt quá 100 ký tự.")]
        public string? TrangThai { get; set; }

        public List<ChiTietPhieuDeXuatPhongBanRequestUpdateDto> ChiTietPhieuDeXuatPhongBans { get; set; } = new List<ChiTietPhieuDeXuatPhongBanRequestUpdateDto>();
    }
}
