using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuDuTruDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? MaPhieuDuTru { get; set; }

        [StringLength(50)]
        public string? ManvLapPhieu { get; set; }

        [Column("MaPDK_Mau")]
        [StringLength(50)]
        public string? MaPdkMau { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayLap { get; set; }

        [StringLength(50)]
        public string? MaKhoa { get; set; }

        public bool? TrangThai { get; set; }
    }
}
