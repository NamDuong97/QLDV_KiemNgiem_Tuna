using Microsoft.EntityFrameworkCore;
using QLDV_KiemNghiem_BE.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    [Keyless]
    public class PhieuPhanTichKetQuaProcedure
    {
        [Column("MaID")]
        [StringLength(50)]
        public string MaID { get; set; } = null!;

        [Column("MaPhieuKetQua")]
        [StringLength(50)]
        public string? MaPhieuKetQua { get; set; }

        [Column("MaPDK_Mau")]
        [StringLength(50)]
        public string? MaPDK_Mau { get; set; }

        [StringLength(200)]
        public string? TenMau { get; set; }

        [Column(TypeName = "decimal(18, 0)")]
        public decimal? SoLuong { get; set; }

        [StringLength(50)]
        public string? DonViTinh { get; set; }

        [StringLength(200)]
        public string? TenTieuChuan { get; set; }

        [StringLength(50)]
        public string? SoLo { get; set; }

        [StringLength(50)]
        public string? MaPhieuDangKy { get; set; }

        [StringLength(50)]
        public string? SDKPT { get; set; }

        [StringLength(200)]
        public string? DonViGuiMau { get; set; }

        [StringLength(200)]
        public string? DonViSanXuat { get; set; }

        [StringLength(50)]
        public string? TrangThaiNhanMau { get; set; }
        [StringLength(500)]
        public string? YeuCauKiemNghiem { get; set; }

        [StringLength(50)]
        public string? ManvLap { get; set; }

        [StringLength(200)]
        public string? TennvLap { get; set; }

        [StringLength(50)]
        public string? ManvKiemTra { get; set; }

        [StringLength(200)]
        public string? TennvKiemTra { get; set; }

        [StringLength(50)]
        public string? MabldDuyet { get; set; }

        [StringLength(200)]
        public string? TenbldDuyet { get; set; }

        [StringLength(50)]
        public string? MaKhoa { get; set; }

        [StringLength(200)]
        public string? TenKhoa { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayNhanMau { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTraKetQua { get; set; }

        public string? NoiDungDuyetSoBo { get; set; }

        public string? NoiDungDuyetTongBo { get; set; }

        [StringLength(500)]
        public string? GhiChu { get; set; }

        public int? TrangThai { get; set; }

        [StringLength(100)]
        public string? NguoiTao { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgayTao { get; set; }

        [StringLength(100)]
        public string? NguoiSua { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? NgaySua { get; set; }

        public bool Active { get; set; }
        public virtual ICollection<PhieuPhanTichKetQuaChiTiet> PhieuPhanTichKetQuaChiTiets { get; set; } = new List<PhieuPhanTichKetQuaChiTiet>();
        // Thuoc tinh navigation de lay danh sach phieuphantichketquachitiet
    }
}
