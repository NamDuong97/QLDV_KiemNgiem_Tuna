namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class HoaDonThuBoSungParam : RequestParameters
    {
        public string? MaID { get; set; }
        public string? MaHD { get; set; }
        public string? ManvLap { get; set; }
        public string? TrangThai { get; set; }
        public string? NgayLapFrom { get; set; } // Định dạng yyyy-MM-dd
        public string? NgayLapTo { get; set; }   // Định dạng yyyy-MM-dd
        public bool? Active { get; set; }
    }
}
