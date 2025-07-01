using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    public class PhieuTienDoLamViecProcedureDto
    {
        [Column("MaID")]
        [StringLength(50)]
        public string MaID { get; set; } = null!;

        [Column("MaPhieuTienDo")]
        [StringLength(50)]
        public string? MaPhieuTienDo { get; set; }

        [Column("MaKhoa")]
        [StringLength(50)]
        public string? MaKhoa { get; set; }

        [Column("MaPDK_Mau")]
        [StringLength(50)]
        public string? MaPDK_Mau { get; set; }

        [StringLength(200)]
        public string? TenMau { get; set; }

        [StringLength(50)]
        public string? SoLo { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTraKetQua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayNhanMau { get; set; }

        [StringLength(50)]
        public string? ManvXuLy { get; set; }

        [StringLength(200)]
        public string? TennvXyLy { get; set; }

        [StringLength(50)]
        public string? ManvKiemTra { get; set; }

        [StringLength(200)]
        public string? TennvKiemTra { get; set; }

        [StringLength(500)]
        public string? TenGiaiDoanThucHien { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? ThoiGianTu { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? ThoiGianDen { get; set; }

        public string? NoiDungBaoCao { get; set; }

        [StringLength(500)]
        public string? NoiDungDanhGia { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        public bool? TrangThai { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }
    }
}
