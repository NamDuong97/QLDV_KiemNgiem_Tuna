namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class HoaDonThuParam : RequestParameters
    {
        public string MaID { get; set; } = string.Empty;
        public string MaHD { get; set; } = string.Empty;
        public string ManvXuLy { get; set; } = string.Empty;
        public string TrangThai { get; set; } = string.Empty;
        public string NgayLapFrom { get; set; } = string.Empty;
        public string NgayLapTo { get; set; } = string.Empty;
        public string TongTienFrom { get; set; } = string.Empty;
        public string TongTienTo { get; set; } = string.Empty;
        public string MaKH { get; set; } = string.Empty;
        public string Active { get; set; } = string.Empty;
        public bool IsHoaDonBoSung { get; set; } = false;
        public bool IsChiTietHoaDon { get; set; } = false;
    }
}
