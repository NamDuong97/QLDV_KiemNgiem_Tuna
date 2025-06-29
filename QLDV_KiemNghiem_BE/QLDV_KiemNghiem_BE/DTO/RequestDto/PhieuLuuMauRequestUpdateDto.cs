using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuLuuMauRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        [StringLength(50, ErrorMessage = "MaId tối đa 50 ký tự")]
        public string MaId { get; set; } = null!;
    
        [StringLength(50, ErrorMessage = "DonViTinh tối đa 50 ký tự")]
        public string DonViTinh { get; set; } = string.Empty;

        [Range(0, double.MaxValue, ErrorMessage = "SoLuong phải lớn hơn 0")]
        public decimal SoLuong { get; set; } = 0;

        public DateTime LuuDenNgay { get; set; } 
 
        [StringLength(50, ErrorMessage = "ManvLuu tối đa 50 ký tự")]
        public string ManvLuu { get; set; } = string.Empty;

        public DateTime HanSuDung { get; set; }
       
        [StringLength(500, ErrorMessage = "TenMau tối đa 500 ký tự")]
        public string TenMau { get; set; } = string.Empty;
    }
}
