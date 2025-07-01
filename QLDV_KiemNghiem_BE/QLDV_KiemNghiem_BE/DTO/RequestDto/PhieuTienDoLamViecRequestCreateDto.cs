using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuTienDoLamViecRequestCreateDto
    {
        
        [StringLength(500, ErrorMessage = "TenGiaiDoanThucHien tối đa 500 ký tự")]
        [Required(ErrorMessage = "TenGiaiDoanThucHien không được bỏ trống")]
        public string TenGiaiDoanThucHien { get; set; } = null!;

        [Required(ErrorMessage = "ThoiGianTu không được bỏ trống")]
        public DateTime ThoiGianTu { get; set; }

        [Required(ErrorMessage = "ThoiGianDen không được bỏ trống")]
        public DateTime ThoiGianDen { get; set; }

        [Required(ErrorMessage = "NoiDungBaoCao không được bỏ trống")]
        public string NoiDungBaoCao { get; set; } = null!;

        [StringLength(500, ErrorMessage = "GhiChu tối đa 500 ký tự")]
        public string GhiChu { get; set; } = null!;

        [StringLength(50, ErrorMessage = "MaPDK_Mau tối đa 50 ký tự")]
        [Required(ErrorMessage = "MaPDK_Mau không được bỏ trống")]
        public string MaPDK_Mau { get; set; } = null!;
    }
}

// NgayTraKetQua, luumau, yeucaukiemnghiem lay tu pdkm