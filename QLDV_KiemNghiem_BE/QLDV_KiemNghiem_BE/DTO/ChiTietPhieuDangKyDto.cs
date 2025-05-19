using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class ChiTietPhieuDangKyDto
    {
        public string MaId { get; set; } = null!;
        public string? MaPhieuDangKy { get; set; }

        public string? MaMau { get; set; }

        public string? MaTieuChuan { get; set; }

        public string? Madv { get; set; }

        public string? DonViTinh { get; set; }

        public decimal? SoLuong { get; set; }

        public string? Solo { get; set; }

        public string? DieuKienBaoQuan { get; set; }

        public string? DonViSanXuat { get; set; }

        public DateTime? NgaySanXuat { get; set; }

        public DateTime? HanSuDung { get; set; }

        public string? YeuCauKiemNghiem { get; set; }

        public string? TinhTrangMau { get; set; }
        public bool? LuuMau { get; set; }

        public bool? XuatKetQua { get; set; }

        public string? TrangThaiNhanMau { get; set; }
        public string? GhiChu { get; set; }
        public string? NguoiSua { get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgaySua { get; set; }
    }
}
