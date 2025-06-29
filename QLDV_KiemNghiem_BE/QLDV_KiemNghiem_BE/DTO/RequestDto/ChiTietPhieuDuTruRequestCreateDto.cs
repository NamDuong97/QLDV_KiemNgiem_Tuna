using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChiTietPhieuDuTruRequestCreateDto
    {
        [Required(ErrorMessage = "DonViTinh không được bỏ trống")]
        [StringLength(50, ErrorMessage = "DonViTinh tối đa 50 ký tự")]
        public string DonViTinh { get; set; } = null!;

        [Required(ErrorMessage = "SoLuong không được bỏ trống")]
        [Range(0, double.MaxValue, ErrorMessage = "SoLuong phai lon hon 0")]
        public decimal? SoLuong { get; set; }

        [Required(ErrorMessage = "MaDmPlhc không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaDmPlhc tối đa 50 ký tự")]
        public string MaDmPlhc { get; set; } = null!;
       
        [StringLength(500, ErrorMessage = "MaKhoa tối đa 500 ký tự")]
        public string? GhiChu { get; set; } = string.Empty;      
    }
}
