﻿namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class RequestReviewPhieuDeXuatPhongBan
    {
        public string Message { get; set; } = string.Empty; // Lời nhắn nếu từ chối 
        public bool Action { get; set; } = false; // Hành động duyệt hoặc k duyệt
        public string MaId { get; set; } = string.Empty; //Mã ChiTietPhieuDeXuatPhongBan
        public string MaKhoa { get; set; } = string.Empty; // Mã mẫu trong phiếu chi tiết này
        // action = 1 la duyet, nguoc lai la k duyet, k duyet thi can phai co ly do luu vao message
        // role de biet ai la nguoi duyet
    }
}
