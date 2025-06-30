using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuPhanTichKetQuaChiTietRequestCreateDto
    {
        [Required(ErrorMessage = "MaChiTieu không được bỏ trống!")]
        [StringLength(50, ErrorMessage = "MaChiTieu tối đa 50 ký tự")]
        public string MaChiTieu { get; set; } = null!;

        [Required(ErrorMessage = "TenChiTieu không được bỏ trống!")]
        [StringLength(500, ErrorMessage = "TenChiTieu tối đa 500 ký tự")]
        public string TenChiTieu { get; set; } = null!;

        [Required(ErrorMessage = "KetQua không được bỏ trống!")]
        [StringLength(500, ErrorMessage = "KetQua tối đa 500 ký tự")]
        public string KetQua { get; set; } = null!;

        [Required(ErrorMessage = "MucChatLuong không được bỏ trống!")]
        [StringLength(200, ErrorMessage = "MucChatLuong tối đa 200 ký tự")]
        public string MucChatLuong { get; set; } = null!;

        [StringLength(50, ErrorMessage = "DonVi tối đa 50 ký tự")]
        public string DonVi { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "GhiChu tối đa 500 ký tự")]
        public string GhiChu { get; set; } = string.Empty;

        [Required(ErrorMessage = "TrangThai không được bỏ trống!")]
        [StringLength(100, ErrorMessage = "TrangThai tối đa 100 ký tự")]
        public string TrangThai { get; set; } = string.Empty;
    }
}

// NgayTraKetQua, luumau, yeucaukiemnghiem lay tu pdkm