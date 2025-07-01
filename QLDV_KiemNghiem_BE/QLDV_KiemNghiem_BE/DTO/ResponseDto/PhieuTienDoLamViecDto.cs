using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuTienDoLamViecDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhieuTienDo { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayNhanMau { get; set; }

        [StringLength(50)]
        public string? ManvXuLy { get; set; }

        [StringLength(500)]
        public string? TenGiaiDoanThucHien { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? ThoiGianTu { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? ThoiGianDen { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? TongThoiGianThucHien { get; set; }

        public string? NoiDungBaoCao { get; set; }

        [StringLength(500)]
        public string? NoiDungDanhGia { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        [StringLength(50)]
        public string? ManvKiemTra { get; set; }

        public bool? TrangThai { get; set; }
    }
}
