using System.ComponentModel.DataAnnotations;

namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class RequestReviewPhieuPhanTichKetQua
    {
        [Required(ErrorMessage = "MaPhieuPhanTichKetQua không được bỏ trống")]
        [StringLength(50, ErrorMessage = "MaPhieuPhanTichKetQua tối đa 50 ký tự")]
        public string MaPhieuPhanTichKetQua { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;

        [Required(ErrorMessage = "Action không được bỏ trống")]
        public bool Action { get; set; } = false;
        // action = 1 la duyet, nguoc lai la k duyet, k duyet thi can phai co ly do luu vao message
        // role de biet ai la nguoi duyet
    }
}
