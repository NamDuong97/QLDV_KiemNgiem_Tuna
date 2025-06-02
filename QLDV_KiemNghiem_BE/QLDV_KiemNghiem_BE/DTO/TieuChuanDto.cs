using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class TieuChuanDto
    {
        public string? MaId { get; set; }

        [StringLength(50)]
        public string? MaDuocDien { get; set; }

        [StringLength(200)]
        public string? TenTieuChuan { get; set; }

        public string? MoTa { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayBanHanh { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayHieuLuc { get; set; }

        [StringLength(200)]
        public string? CoQuanBanHanh { get; set; }

        public bool? TrangThai { get; set; }

        [StringLength(200)]
        public string? PhienBan { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }
    }
}
