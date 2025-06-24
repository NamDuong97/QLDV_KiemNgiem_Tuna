using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.DTO.RequestDto
{
    public class PhieuDangKyMauResponseCancelDto
    {
        public string MaId { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;
        public bool KetQua { get; set; } = false;
    }
}
