namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class LoginResponse<T>
    {
        public bool KetQua { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
        public string Token { get; set; }   = string.Empty ;
    }
}
