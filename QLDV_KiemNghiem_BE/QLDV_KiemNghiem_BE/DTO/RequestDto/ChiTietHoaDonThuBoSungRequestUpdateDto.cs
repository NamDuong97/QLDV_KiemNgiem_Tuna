using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChiTietHoaDonThuBoSungRequestUpdateDto
    {
       
        [StringLength(50, ErrorMessage = "MaID tối đa 50 ký tự")]
        public string MaID { get; set; } = string.Empty;

        //[StringLength(50, ErrorMessage = "MaHDBS tối đa 50 ký tự")]
        //public string? MaHDBS { get; set; } = string.Empty;

        [Required(ErrorMessage = "MaDM_PLHC không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaDM_PLHC tối đa 50 ký tự")]
        public string? MaDM_PLHC { get; set; } 

        [StringLength(50, ErrorMessage = "DonViTinh tối đa 50 ký tự")]
        public string? DonViTinh { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "SoLuong phải >= 0")]
        public int? SoLuong { get; set; }

        [Range(0, double.MaxValue, ErrorMessage = "DonGia phải >= 0")]
        public decimal? DonGia { get; set; }
        public bool IsDel {  get; set; } = false;
    }

}
