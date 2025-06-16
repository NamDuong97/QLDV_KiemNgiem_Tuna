using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuPhanTichKetQuaDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhieuKetQua { get; set; }

        [Column("MaPDK_Mau")]
        [StringLength(50)]
        public string? MaPdkMau { get; set; }

        [StringLength(500)]
        public string? TenMau { get; set; }

        [StringLength(50)]
        public string? ManvLap { get; set; }

        [StringLength(50)]
        public string? ManvKiemTra { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayNhanMau { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayKiemThu { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTraKetQua { get; set; }

        public bool? LuuMau { get; set; }

        [StringLength(50)]
        public string? MaKhoa { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        [StringLength(100)]
        public string? TrangThai { get; set; }

        public string? YeuCauKiemNghiem { get; set; }
    }
}
