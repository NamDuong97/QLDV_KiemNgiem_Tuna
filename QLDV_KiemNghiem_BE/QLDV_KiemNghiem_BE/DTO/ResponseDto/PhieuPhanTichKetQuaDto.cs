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

        [StringLength(50)]
        public string? ManvLap { get; set; }

        [StringLength(50)]
        public string? ManvKiemTra { get; set; }

        [StringLength(50)]
        public string? MaKhoa { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        public int? TrangThai { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [StringLength(50)]
        public string? MabldDuyet { get; set; }

        public string? NoiDungDuyetSoBo { get; set; }

        public string? NoiDungDuyetTongBo { get; set; }
        public bool Active { get; set; }
        public List<PhieuPhanTichKetQuaChiTietDto> phieuPhanTichKetQuaChiTietDtos { get; set; } = new List<PhieuPhanTichKetQuaChiTietDto>();
    }
}
