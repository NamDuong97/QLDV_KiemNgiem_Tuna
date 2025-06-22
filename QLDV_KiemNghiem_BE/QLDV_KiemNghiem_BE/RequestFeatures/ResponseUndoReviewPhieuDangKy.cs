namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class ResponseUndoReviewPhieuDangKy
    {
        public string MaPhieuDangKy { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty ;
        public bool KetQua {  get; set; } = false ;
    }
}
