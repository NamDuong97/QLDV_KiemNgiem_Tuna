namespace QLDV_KiemNghiem_BE.RequestFeatures.PagingRequest
{
    public class PhieuDuTruParam : RequestParameters
    {
        public string? MaId { get; set; }
        public string? MaKhoa { get; set; }
        public string? ManvLap { get; set; }
        public string? ManvDuyet { get; set; }
        public int? TrangThai { get; set; } = -1;
        public string? NgayLapFrom { get; set; }
        public string? NgayLapTo { get; set; }
        public string? NoiDungDuyet { get; set; }
    }
}
