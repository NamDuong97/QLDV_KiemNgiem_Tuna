using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuDangKyDto
    {
        public string? MaId { get; set; }

        [Required(ErrorMessage = "Mã khách hàng không thể thiếu")]
        [StringLength(50, ErrorMessage = "Mã khách hàng tối đa 50 ký tự")]
        public string? MaKh { get; set; }

        [StringLength(50, ErrorMessage = "Mã nhân viên nhận mẫu tối đa 50 ký tự")]
        public string? ManvNhanMau { get; set; }

        [StringLength(200, ErrorMessage = "Tên người nhận mẫu tối đa 200 ký tự")]
        public string? NguoiNhanMau { get; set; }

        [Required(ErrorMessage = "Đơn vị gửi mẫu không thể thiếu")]
        [StringLength(500, ErrorMessage = "Đơn vị gửi mẫu tối đa 500 ký tự")]
        public string? DonViGuiMau { get; set; }

        [Required(ErrorMessage = "Người gửi mẫu không thể thiếu")]
        [StringLength(200, ErrorMessage = "Người gửi mẫu tối đa 200 ký tự")]
        public string? NguoiGuiMau { get; set; }

        [Required(ErrorMessage = "Số điện thoại không thể thiếu")]
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
        [StringLength(50, ErrorMessage = "Số điện thoại tối đa 50 ký tự")]
        public string? SoDienThoai { get; set; }

        [Required(ErrorMessage = "Email không thể thiếu")]
        [EmailAddress(ErrorMessage = "Email không đúng định dạng")]
        [StringLength(50, ErrorMessage = "Email tối đa 50 ký tự")]
        public string? Email { get; set; }

        [StringLength(500, ErrorMessage = "Địa chỉ liên hệ tối đa 500 ký tự")]
        public string? DiaChiLienHe { get; set; }

        [StringLength(50, ErrorMessage = "Hình thức gửi mẫu tối đa 50 ký tự")]
        public string? HinhThucGuiMau { get; set; }

        [StringLength(50, ErrorMessage = "Hình thức trả kết quả tối đa 50 ký tự")]
        public string? HinhThucTraKq { get; set; }

        [StringLength(500, ErrorMessage = "Địa chỉ giao mẫu tối đa 500 ký tự")]
        public string? DiaChiGiaoMau { get; set; }

        [StringLength(50, ErrorMessage = "Trạng thái tối đa 50 ký tự")]
        public string? TrangThaiId { get; set; }
        public bool? KetQuaTiengAnh { get; set; }

        [Required(ErrorMessage = "Ngày giao mẫu không thể thiếu")]
        [DataType(DataType.DateTime, ErrorMessage = "Ngày giao mẫu không hợp lệ")]
        public DateTime? NgayGiaoMau { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày thực hiện không hợp lệ")]
        public DateTime? NgayThucHien { get; set; }

        [StringLength(50, ErrorMessage = "Người sửa tối đa 50 ký tự")]
        public string? NguoiSua { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày tạo không hợp lệ")]
        public DateTime? NgayTao { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày sửa không hợp lệ")]
        public DateTime? NgaySua { get; set; }
        public string? SoDkpt { get; set; }

        [StringLength(50)]
        public string? ManvSoDuyet { get; set; }

        [Column("MaBLDDuyet")]
        [StringLength(50)]
        public string? MaBldduyet { get; set; }

        [StringLength(500)]
        public string? NoiDungDuyetSoBo { get; set; }

        [StringLength(500)]
        public string? NoiDungTongDuyet { get; set; }
        public List<PhieuDangKyMauDto> Maus { get; set; } = new List<PhieuDangKyMauDto>();
        public IEnumerable<PhieuDangKyPhuLieuHoaChatDto> PhieuDangKyPhuLieuHoaChats { get; set; } = new List<PhieuDangKyPhuLieuHoaChatDto>();
    }
}
