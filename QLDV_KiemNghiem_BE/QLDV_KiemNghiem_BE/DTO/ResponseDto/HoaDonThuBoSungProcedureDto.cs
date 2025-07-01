using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    
    public class HoaDonThuBoSungProcedureDto
    {
        [Column("MaID")]
        [StringLength(50)]
        public string MaID { get; set; } = null!;

        [Column("MaHD")]
        [StringLength(50)]
        public string? MaHD { get; set; }

        [Column("TongTien", TypeName = "decimal(18,2)")]
        public decimal? TongTien { get; set; }

        [Column("ManvLap")]
        [StringLength(50)]
        public string? ManvLap { get; set; }

        [Column("TenNvLap")]
        [StringLength(200)]
        public string? TenNvLap { get; set; }

        [Column("TrangThai")]
        [StringLength(50)]
        public string? TrangThai { get; set; }

        [Column("NgayTao")]
        public DateTime? NgayTao { get; set; }

        [Column("NguoiTao")]
        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [Column("NgaySua")]
        public DateTime? NgaySua { get; set; }

        [Column("NguoiSua")]
        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column("GhiChu")]
        [StringLength(500)]
        public string? GhiChu { get; set; }

        [Column("Active")]
        public bool Active { get; set; }

        public List<ChiTietHoaDonThuBoSungDto> ChiTietHoaDonThuBoSungDtos { get; set; } = new List<ChiTietHoaDonThuBoSungDto>();
    }
}
