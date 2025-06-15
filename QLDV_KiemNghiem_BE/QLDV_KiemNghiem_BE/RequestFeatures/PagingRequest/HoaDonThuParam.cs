namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class HoaDonThuParam : RequestParameters
    {
        public string? ManvXuLy {  get; set; }
        public string? SoDKPT { get; set; }
        public string? MaHoaDon { get; set; }
        public string? NgayLapFrom { get; set; }

        public string? NgayLapTo { get; set; }

        public decimal? TongTienFrom { get; set; }

        public decimal? TongTienTo { get; set; }

    }
}
