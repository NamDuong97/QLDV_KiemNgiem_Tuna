using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class TieuChuanRequestUpdateDto
    {
        [Required(ErrorMessage = "MaId không được bỏ trống!")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "Tên tiêu chuẩn không được bỏ trống")]
        [StringLength(200, ErrorMessage = "Tên tiêu chuẩn tối đa 200 ký tự")]
        public string? TenTieuChuan { get; set; }

        [StringLength(1000, ErrorMessage = "Mô tả tối đa 1000 ký tự")]
        public string? MoTa { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày ban hành không hợp lệ")]
        [Column(TypeName = "datetime")]
        public DateTime? NgayBanHanh { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày hiệu lực không hợp lệ")]
        [Column(TypeName = "datetime")]
        public DateTime? NgayHieuLuc { get; set; }

        [StringLength(200, ErrorMessage = "Cơ quan ban hành tối đa 200 ký tự")]
        public string? CoQuanBanHanh { get; set; }

        [StringLength(200, ErrorMessage = "Phiên bản tối đa 200 ký tự")]
        public string? PhienBan { get; set; }
    }
}
