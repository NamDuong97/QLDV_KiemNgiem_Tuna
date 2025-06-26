using Microsoft.EntityFrameworkCore;

namespace QLDV_KiemNghiem_BE.DTO.ResponseDto
{
    [Keyless]
    public class PhieuDangKyMauThongKeDto
    {
        public int MauChoPhanCong {  get; set; }    
        public int MauDangKiemNghiem { get; set; }
        public int MauHuyBoiKhach {  get; set; }    
        public int MauHuyBoiPhongKhoa { get; set; } 
        public int MauPhanCongChoDuyet { get; set; }
        public int MauHoanThanh {  get; set; }  
    }
}
