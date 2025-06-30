using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuLuuMauRequestCreateDto
    {
        [Required(ErrorMessage = "MaPdkMau không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaPdkMau tối đa 50 ký tự")]
        public string MaPdkMau { get; set; } = null!;

        [Required(ErrorMessage = "DonViTinh không được bỏ trống")]
        [StringLength(50, ErrorMessage = "DonViTinh tối đa 50 ký tự")]
        public string DonViTinh { get; set; } = null!;

        [Required(ErrorMessage = "SoLuong không được bỏ trống")]
        [Range(0, double.MaxValue, ErrorMessage = "SoLuong phải lớn hơn 0")]
        public decimal SoLuong { get; set; } = 0;

        [Required(ErrorMessage = "LuuDenNgay không được bỏ trống")]
        public DateTime LuuDenNgay { get; set; }

        [Required(ErrorMessage = "ManvLuu không được bỏ trống")]
        [StringLength(50, ErrorMessage = "ManvLuu tối đa 50 ký tự")]
        public string ManvLuu { get; set; } = null!;

        [Required(ErrorMessage = "HanSuDung không được bỏ trống")]
        public DateTime HanSuDung { get; set; }

        [Required(ErrorMessage = "TenMau không được bỏ trống")]
        [StringLength(500, ErrorMessage = "TenMau tối đa 500 ký tự")]
        public string TenMau { get; set; } =  null!;
    }
}
