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

        [StringLength(500, ErrorMessage = "GhiChu tối đa 500 ký tự")]
        public string GhiChu { get; set; } = string.Empty;

        [Range(0, maximum: 10, ErrorMessage = "TrangThai phai lon hon 0")]
        public int TrangThai { get; set; } = 0;
        public string NoiDungDuyetSoBo { get; set; } = string.Empty;

        public string NoiDungDuyetTongBo { get; set; } = string.Empty;
        public List<PhieuPhanTichKetQuaChiTietRequestUpdateDto> ChiTietPhanTichKetQuas { get; set; } = new List<PhieuPhanTichKetQuaChiTietRequestUpdateDto>();

    }
}
