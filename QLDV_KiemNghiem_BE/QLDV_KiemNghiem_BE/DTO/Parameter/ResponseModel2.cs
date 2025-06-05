namespace QLDV_KiemNghiem_BE.DTO.Parameter
{
    public class ResponseModel2<T>
    {
        public bool KetQua { get; set; }
        public string Message { get; set; } = string.Empty;
        public List<T>? Data { get; set; }
    }
}
