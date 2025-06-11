namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class ResponseModel1<T>
    {
        public bool KetQua { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
    }
}
