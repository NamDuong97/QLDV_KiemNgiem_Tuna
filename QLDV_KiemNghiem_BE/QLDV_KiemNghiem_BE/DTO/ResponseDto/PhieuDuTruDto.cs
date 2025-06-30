using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using QLDV_KiemNghiem_BE.DTO.RequestDto;

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

        public int? TrangThai { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        public bool? Active { get; set; }

        [StringLength(50)]
        public string? ManvDuyet { get; set; }

        [StringLength(500)]
        public string? NoiDungDuyet { get; set; }
        public List<ChiTietPhieuDuTruDto> ChiTietPhieuDuTrus { get; set; } = new List<ChiTietPhieuDuTruDto>();
    }
}
