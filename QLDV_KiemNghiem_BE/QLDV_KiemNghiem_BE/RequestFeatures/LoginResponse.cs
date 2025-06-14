namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class LoginResponse
    {
        public bool KetQua { get; set; }
        public string Message { get; set; } = string.Empty;
        public string Token { get; set; }   = string.Empty ;
        public string RefreshToken { get; set; } = string.Empty;
    }
}
