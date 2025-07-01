using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QLDV_KiemNghiem_BE.DTO.ResponseDto;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class HoaDonThuBoSungRequestCreateDto
    {
        [Required(ErrorMessage = "MaHD không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaHD tối đa 50 ký tự")]
        public string MaHD { get; set; } = null!;

        [StringLength(500, ErrorMessage = "GhiChu tối đa 50 ký tự")]
        public string? GhiChu { get; set; }

        public List<ChiTietHoaDonThuBoSungRequestCreateDto> ChiTietHoaDonThuBoSungDtos { get; set; } = new List<ChiTietHoaDonThuBoSungRequestCreateDto>();
    }
}

// NgayTraKetQua, luumau, yeucaukiemnghiem lay tu pdkm