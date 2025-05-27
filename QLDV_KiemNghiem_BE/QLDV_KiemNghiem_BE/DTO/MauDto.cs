using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using QLDV_KiemNghiem_BE.Models;
//using QLDV_KiemNghiem_BE.Models;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class MauDto
    {
        public string MaId { get; set; } = string.Empty;

        [StringLength(50, ErrorMessage = "Mã mẫu tối đa 50 ký tự")]
        public string? MaMau { get; set; }

        [StringLength(200, ErrorMessage = "Tên mẫu tối đa 200 ký tự")]
        public string? TenMau { get; set; }

        [StringLength(50, ErrorMessage = "Mã loại mẫu tối đa 50 ký tự")]
        public string? MaLoaiMau { get; set; }

        [StringLength(50, ErrorMessage = "Mã tiêu chuẩn tối đa 50 ký tự")]
        public string? MaTieuChuan { get; set; }

        [StringLength(50, ErrorMessage = "Mã phiếu đăng ký tối đa 50 ký tự")]
        public string? MaPhieuDangKy { get; set; }

        [StringLength(50, ErrorMessage = "Mã nhân viên thực hiện tối đa 50 ký tự")]
        public string? ManvThucHien { get; set; }

        [StringLength(50, ErrorMessage = "Mã dịch vụ tối đa 50 ký tự")]
        public string? Madv { get; set; }

        [StringLength(50, ErrorMessage = "Số lô tối đa 50 ký tự")]
        public string? SoLo { get; set; }

        [StringLength(200, ErrorMessage = "Đơn vị sản xuất tối đa 200 ký tự")]
        public string? DonViSanXuat { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày sản xuất không hợp lệ")]
        public DateTime? NgaySanXuat { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Hạn sử dụng không hợp lệ")]
        public DateTime? HanSuDung { get; set; }

        [StringLength(50, ErrorMessage = "Đơn vị tính tối đa 50 ký tự")]
        public string? DonViTinh { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "Số lượng phải lớn hơn hoặc bằng 0")]
        public decimal? SoLuong { get; set; }

        public string? YeuCauKiemNghiem { get; set; }

        [StringLength(500, ErrorMessage = "Tình trạng mẫu tối đa 500 ký tự")]
        public string? TinhTrangMau { get; set; }

        [StringLength(200, ErrorMessage = "Điều kiện bảo quản tối đa 200 ký tự")]
        public string? DieuKienBaoQuan { get; set; }

        public bool? LuuMau { get; set; }

        public bool? XuatKetQua { get; set; }

        [StringLength(50, ErrorMessage = "Trạng thái nhận mẫu tối đa 50 ký tự")]
        public string? TrangThaiNhanMau { get; set; }

        [StringLength(50, ErrorMessage = "Ghi chú tối đa 50 ký tự")]
        public string? GhiChu { get; set; }

        [StringLength(50, ErrorMessage = "Người tạo tối đa 50 ký tự")]
        public string? NguoiTao { get; set; }

        [StringLength(50, ErrorMessage = "Người sửa tối đa 50 ký tự")]
        public string? NguoiSua { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày tạo không hợp lệ")]
        public DateTime? NgayTao { get; set; }

        [DataType(DataType.DateTime, ErrorMessage = "Ngày sửa không hợp lệ")]
        public DateTime? NgaySua { get; set; }
        public  ICollection<MauHinhAnhDto> HinhAnhs { get; set; } = new List<MauHinhAnhDto>();
    }
}
