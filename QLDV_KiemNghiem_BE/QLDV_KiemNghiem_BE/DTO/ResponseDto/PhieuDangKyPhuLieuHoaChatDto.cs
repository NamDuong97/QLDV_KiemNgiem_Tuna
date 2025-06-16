using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuDangKyPhuLieuHoaChatDto
    {
        public string? MaId { get; set; }

        [StringLength(50, ErrorMessage = "Mã phiếu đăng ký tối đa 50 ký tự")]
        public string? MaPhieuDangKy { get; set; } = string.Empty;

        [StringLength(50, ErrorMessage = "Mã phụ liệu hóa chất tối đa 50 ký tự")]
        public string? MaPlhc { get; set; } = string.Empty;

        [StringLength(200, ErrorMessage = "Tên phụ liệu hóa chất tối đa 200 ký tự")]
        public string? TenPlhc { get; set; }

        [StringLength(200, ErrorMessage = "Tên hiển thị tối đa 200 ký tự")]
        public string? TenHienThi { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Số lượng phải lớn hơn hoặc bằng 0")]
        public int? SoLuong { get; set; }

        [StringLength(50, ErrorMessage = "Đơn vị tính tối đa 50 ký tự")]
        public string? DonViTinh { get; set; }

        [StringLength(200, ErrorMessage = "Ghi chú tối đa 200 ký tự")]
        public string? GhiChu { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày hết hạn không hợp lệ")]
        public DateTime? NgayHetHan { get; set; }

        [StringLength(200, ErrorMessage = "Tên nhà cung cấp tối đa 200 ký tự")]
        public string? TenNhaCungCap { get; set; }

        [StringLength(50, ErrorMessage = "Số lô tối đa 50 ký tự")]
        public string? SoLo { get; set; }

        [StringLength(50, ErrorMessage = "Người tạo tối đa 50 ký tự")]
        public string? NguoiTao { get; set; }

        [StringLength(50, ErrorMessage = "Người sửa tối đa 50 ký tự")]
        public string? NguoiSua { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày tạo không hợp lệ")]
        public DateTime? NgayTao { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày sửa không hợp lệ")]
        public DateTime? NgaySua { get; set; }

        public bool IsDel { get; set; }

    }
}
