using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChiTietHoaDonThuBoSungRequestCreateDto
    {
        //[Required(ErrorMessage = "MaHDBS không được bỏ trống")]
        //[StringLength(50, ErrorMessage = "MaHDBS tối đa 50 ký tự")]
        //public string MaHDBS { get; set; } = null!;

        [Required(ErrorMessage = "MaDM_PLHC không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaDM_PLHC tối đa 50 ký tự")]
        public string MaDM_PLHC { get; set; } = null!;

        [StringLength(50, ErrorMessage = "DonViTinh tối đa 50 ký tự")]
        public string? DonViTinh { get; set; }

        [Required(ErrorMessage = "SoLuong không được bỏ trống")]
        [Range(1, int.MaxValue, ErrorMessage = "SoLuong phải lớn hơn 0")]
        public int SoLuong { get; set; }

        [Required(ErrorMessage = "DonGia không được bỏ trống")]
        [Range(0, double.MaxValue, ErrorMessage = "DonGia phải >= 0")]
        public decimal DonGia { get; set; }

    }

}
