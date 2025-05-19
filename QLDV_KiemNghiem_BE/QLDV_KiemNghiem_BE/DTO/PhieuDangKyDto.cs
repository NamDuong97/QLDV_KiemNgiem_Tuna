using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class PhieuDangKyDto
    {
        public string MaId { get; set; } = null!;
        public string? MaKh { get; set; }
        public string? ManvNhanMau { get; set; }
        public string? NguoiNhanMau { get; set; }
        public string? DonViGuiMau { get; set; }
        public string? NguoiGuiMau { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChiLienHe { get; set; }
        public string? HinhThucGuiMau { get; set; }
        public string? HinhThucTraKq { get; set; }
        public string? DiaChiGiaoMau { get; set; }
        public string? TrangThaiId { get; set; }
        public bool? KetQuaTiengViet { get; set; }
        public bool? KetQuaTiengAnh { get; set; }
        public DateTime? NgayGiaoMau { get; set; }
        public DateTime? NgayThucHien { get; set; }
        public string? NguoiSua { get; set; }
        public DateTime? NgayTao { get; set; }
        public DateTime? NgaySua { get; set; }
        public List<ChiTietPhieuDangKyDto> ChiTietPhieuDangKies = new List<ChiTietPhieuDangKyDto>();
    }
}
