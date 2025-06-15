namespace QLDV_KiemNghiem_BE.RequestFeatures
{
    public class CachedResponse<T>
    {
        public T? Data { get; set; }
        public Dictionary<string, string>? Headers { get; set; }
    }
}
