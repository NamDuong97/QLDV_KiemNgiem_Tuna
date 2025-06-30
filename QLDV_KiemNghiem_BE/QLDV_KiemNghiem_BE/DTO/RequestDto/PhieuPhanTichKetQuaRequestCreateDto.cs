using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuPhanTichKetQuaRequestCreateDto
    {
        [Required(ErrorMessage = "MaPdkMau không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaPdkMau tối đa 50 ký tự")]
        public string MaPdkMau { get; set; } = null!;

        [StringLength(50, ErrorMessage = "MaKhoa tối đa 50 ký tự")]
        [Required(ErrorMessage = "MaKhoa không được bỏ trống")]
        public string MaKhoa { get; set; } = null!;

        [StringLength(500, ErrorMessage = "GhiChu tối đa 500 ký tự")]
        public string GhiChu { get; set; } = string.Empty;
        public List<PhieuPhanTichKetQuaChiTietRequestCreateDto> ChiTietPhanTichKetQuas { get; set; } = new List<PhieuPhanTichKetQuaChiTietRequestCreateDto>();

    }
}

// NgayTraKetQua, luumau, yeucaukiemnghiem lay tu pdkm