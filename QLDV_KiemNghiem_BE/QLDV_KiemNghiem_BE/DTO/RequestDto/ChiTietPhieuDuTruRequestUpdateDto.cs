using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class ChiTietPhieuDuTruRequestUpdateDto
    {
        [StringLength(50, ErrorMessage = "MaId tối đa 50 ký tự")]
        public string MaId { get; set; } = null!;

        [Required(ErrorMessage = "MaPhieuDuTru không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaPhieuDuTru tối đa 50 ký tự")]
        public string MaPhieuDuTru { get; set; } = null!;

        [StringLength(50, ErrorMessage = "DonViTinh tối đa 50 ký tự")]
        public string DonViTinh { get; set; } = string.Empty;

        [Range(0, double.MaxValue, ErrorMessage = "SoLuong phai lon hon 0")]
        public decimal? SoLuong { get; set; } = 0;

        [StringLength(50, ErrorMessage = "MaDmPlhc tối đa 50 ký tự")]
        public string? MaDmPlhc { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "GhiChu tối đa 500 ký tự")]
        public string? GhiChu { get; set; } = string.Empty;

        public bool IsDel { get; set; } = false;
    }
}
