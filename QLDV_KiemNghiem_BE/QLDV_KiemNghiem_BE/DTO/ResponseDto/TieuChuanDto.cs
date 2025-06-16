using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class TieuChuanDto
    {
        public string? MaId { get; set; }

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

        public bool? TrangThai { get; set; }

        [StringLength(200, ErrorMessage = "Phiên bản tối đa 200 ký tự")]
        public string? PhienBan { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày tạo không hợp lệ")]
        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50, ErrorMessage = "Người tạo tối đa 50 ký tự")]
        public string? NguoiTao { get; set; }

        [StringLength(50, ErrorMessage = "Người sửa tối đa 50 ký tự")]
        public string? NguoiSua { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày sửa không hợp lệ")]
        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [StringLength(50, ErrorMessage = "Mã tiêu chuẩn tối đa 50 ký tự")]
        public string? MaTieuChuan { get; set; }
    }
}
