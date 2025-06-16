using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuDeXuatPhongBanDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhieuDeXuat { get; set; }

        [StringLength(50)]
        public string MaPhieuDangKy { get; set; } = null!;

        [StringLength(200)]
        public string? TenKhachHang { get; set; }

        [StringLength(50)]
        public string MaKhoaTiepNhan { get; set; } = null!;

        [StringLength(50)]
        public string? ManvDeXuat { get; set; }

        [StringLength(50)]
        public string? ManvTiepNhan { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? ThoiGianGiaoMau { get; set; }

        [StringLength(100)]
        public string? TrangThai { get; set; }
    }
}
