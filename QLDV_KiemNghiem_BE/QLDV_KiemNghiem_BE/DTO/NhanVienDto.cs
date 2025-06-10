using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class NhanVienDto
    {
        public string MaId { get; set; } = null!;

        [StringLength(50)]
        public string? Manv { get; set; }

        [StringLength(200)]
        public string? HoTen { get; set; }

        [StringLength(50)]
        public string? GioiTinh { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySinh { get; set; }

        [StringLength(500)]
        public string? NoiSinh { get; set; }

        [StringLength(200)]
        public string? DiaChi { get; set; }

        [StringLength(50)]
        public string? MaKhoa { get; set; }

        [StringLength(50)]
        public string? MaBoPhan { get; set; }

        [StringLength(50)]
        public string? MaChucVu { get; set; }

        [Column("CCCD")]
        [StringLength(50)]
        public string? Cccd { get; set; }

        [Column("NgayCapCCCD", TypeName = "datetime")]
        public DateTime? NgayCapCccd { get; set; }

        [StringLength(500)]
        public string? NoiCap { get; set; }

        [StringLength(500)]
        public string? DiaChiThuongTru { get; set; }

        [StringLength(50)]
        public string? EmailCaNhan { get; set; }

        [StringLength(50)]
        public string? SoDienThoai { get; set; }

        [StringLength(50)]
        public string? TrangThai { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayLamViec { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayThoiViec { get; set; }

        public bool? LamViec { get; set; }

        [StringLength(50)]
        public string? NguoiTao { get; set; }

        [StringLength(50)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        [StringLength(200)]
        public string? TenTaiKhoan { get; set; }

        [StringLength(200)]
        public string? MatKhau { get; set; }

        [Column("MaLoaiTK")]
        [StringLength(50)]
        public string? MaLoaiTk { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySuaMatKhau { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayHetHanMatKhau { get; set; }
    }
}
