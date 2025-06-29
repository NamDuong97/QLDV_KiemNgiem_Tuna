using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuPhanTichKetQuaRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        [StringLength(50, ErrorMessage = "MaId tối đa 50 ký tự")]
        public string MaId { get; set; } = null!;
          
        public DateTime NgayNhanMau { get; set; }
     
        public DateTime NgayKiemThu { get; set; }

        [StringLength(50, ErrorMessage = "MaKhoa tối đa 50 ký tự")]
      
        public string MaKhoa { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "GhiChu tối đa 500 ký tự")]
        public string GhiChu { get; set; } = string.Empty;
        public List<PhieuPhanTichKetQuaChiTietRequestUpdateDto> ChiTietPhanTichKetQuas { get; set; } = new List<PhieuPhanTichKetQuaChiTietRequestUpdateDto>();

    }
}
