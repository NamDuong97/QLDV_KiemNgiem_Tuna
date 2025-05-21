using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO
{
    public class DmPhuLieuHoaChatDto
    {
        public string MaId { get; set; } = null!;

        public string? MaDmPlhc { get; set; }

        public string? TenDmPlhc { get; set; }

        public bool? TrangThai { get; set; }

        public string? TenHienThi { get; set; }

        public decimal? NongDo { get; set; }

        public string? DonViNongDo { get; set; }

        public string? DieuKienBaoQuan { get; set; }
    }
}
