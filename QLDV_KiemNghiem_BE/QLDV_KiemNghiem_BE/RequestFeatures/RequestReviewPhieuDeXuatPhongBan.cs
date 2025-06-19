namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class RequestReviewPhieuDeXuatPhongBan
    {
        public string MaPhieuDeXuat { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public string Roll { get; set; } = string.Empty;
        public bool Action { get; set; } = false;
        public string MaId { get; set; } = string.Empty;
        // action = 1 la duyet, nguoc lai la k duyet, k duyet thi can phai co ly do luu vao message
        // role de biet ai la nguoi duyet
    }
}
