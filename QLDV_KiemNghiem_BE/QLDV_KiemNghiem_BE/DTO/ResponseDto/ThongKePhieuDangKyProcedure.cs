using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    [Keyless]
    public class ThongKePhieuDangKyProcedure
    {
        public int TongPhieu { get; set; }
        public int DaHoanThanh { get; set; }
        public int DangKiemNghiem { get; set; }
        public int TTTuChoi { get; set; }
        public int KhachHangHuy { get; set; }

        public int TT01 { get; set; }
        public int TT02 { get; set; }
        public int TT03 { get; set; }
        public int TT04 { get; set; }
        public int TT05 { get; set; }
        public int TT06 { get; set; }
        public int TT07 { get; set; }
        public int TT08 { get; set; }
        public int TT09 { get; set; }
        public int TT10 { get; set; }
        public int TT11 { get; set; }
    }
}
