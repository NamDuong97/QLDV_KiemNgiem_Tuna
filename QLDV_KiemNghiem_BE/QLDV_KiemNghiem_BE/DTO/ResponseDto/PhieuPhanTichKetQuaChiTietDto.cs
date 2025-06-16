using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuPhanTichKetQuaChiTietDto
    {
        public string? MaId { get; set; }

        [StringLength(50)]
        public string? MaPhieuKetQua { get; set; }

        [StringLength(50)]
        public string? MaChiTieu { get; set; }

        [StringLength(500)]
        public string? TenChiTieu { get; set; }

        [StringLength(500)]
        public string? KetQua { get; set; }

        [StringLength(50)]
        public string? DonVi { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        [StringLength(100)]
        public string? TrangThai { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [StringLength(200)]
        public string? MucChatLuong { get; set; }
    }
}
