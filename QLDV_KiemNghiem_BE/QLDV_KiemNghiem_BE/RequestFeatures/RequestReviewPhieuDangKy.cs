namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class RequestReviewPhieuDangKy
    {
        public string MaPhieuDangKy { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Roll { get; set; } = string.Empty;
        public bool Action { get; set; } = false;
    }
}
